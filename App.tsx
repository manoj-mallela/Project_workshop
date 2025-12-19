
import React, { useState, useCallback, useEffect } from 'react';
import { SAMPLE_REVIEWS } from './constants';
import { ComparisonData, AnalysisResult, Sentiment } from './types';
import { analyzeWithLexicon } from './services/lexiconService';
import { analyzeWithML } from './services/geminiService';
import AnalysisCard from './components/AnalysisCard';
import PipelineExplainer from './components/PipelineExplainer';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (text: string) => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const lexiconResult = analyzeWithLexicon(text);
      const mlResult = await analyzeWithML(text);
      
      setComparison({
        lexicon: lexiconResult,
        ml: mlResult,
        rawText: text
      });
    } catch (err) {
      setError("Failed to process Machine Learning analysis. Please check your network or API key.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSample = (sampleText: string) => {
    setInputText(sampleText);
    handleAnalyze(sampleText);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <header className="mb-12 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-2xl">Sentix</span>
              Review Classifier
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Comparing Lexicon Dictionaries vs. Machine Learning Inference</p>
          </div>
          <div className="flex items-center gap-2 justify-center md:justify-end">
             <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                <i className="fas fa-circle text-[8px] text-green-500 animate-pulse"></i>
                Engine Active
             </span>
          </div>
        </div>
      </header>

      <main className="space-y-8">
        {/* Input Section */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
            Enter Review Text
          </label>
          <div className="relative">
            <textarea
              className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none text-slate-800 font-medium leading-relaxed"
              placeholder="Paste a movie review or product feedback here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={() => handleAnalyze(inputText)}
              disabled={isAnalyzing || !inputText.trim()}
              className={`absolute bottom-4 right-4 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                isAnalyzing || !inputText.trim() 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Computing...
                </>
              ) : (
                <>
                  Analyze Sentiment
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Quick Samples</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_REVIEWS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => loadSample(sample.text)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:border-indigo-300 transition-all flex items-center gap-2"
                >
                  <i className={`fas ${sample.source === 'Amazon' ? 'fa-shopping-cart text-amber-500' : 'fa-film text-blue-500'}`}></i>
                  {sample.source} Sample {sample.id}
                </button>
              ))}
            </div>
          </div>
        </section>

        {error && (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-600 text-sm flex items-center gap-3">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {/* Results Section */}
        {(comparison || isAnalyzing) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnalysisCard 
              title="Lexicon-Based"
              subtitle="Rule-based / Dictionary lookup"
              icon="fa-book"
              result={comparison?.lexicon || null}
              loading={isAnalyzing}
              color="bg-slate-800"
            />
            <AnalysisCard 
              title="ML (Simulated)"
              subtitle="TF-IDF + Logistic Regression"
              icon="fa-brain"
              result={comparison?.ml || null}
              loading={isAnalyzing}
              color="bg-indigo-600"
            />
          </section>
        )}

        {/* Informational Section */}
        <PipelineExplainer />

        {/* Method Comparison Summary */}
        <section className="bg-slate-900 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-4">The Verdict</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Why does this comparison matter? In production environments, engineers often balance **latency** and **accuracy**. 
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <i className="fas fa-bolt text-yellow-400"></i>
                Lexicon Pros
              </h3>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex gap-2"><span>•</span> Extremely fast execution (sub-ms)</li>
                <li className="flex gap-2"><span>•</span> No training data required</li>
                <li className="flex gap-2"><span>•</span> Highly interpretable decisions</li>
              </ul>
            </div>
            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <i className="fas fa-rocket text-indigo-400"></i>
                ML Pros
              </h3>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex gap-2"><span>•</span> Understands nuance & negation</li>
                <li className="flex gap-2"><span>•</span> Captures context and intent</li>
                <li className="flex gap-2"><span>•</span> Accuracy scales with more data</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 text-center text-slate-400 text-xs pb-12">
        <p>© 2024 Sentix NLP Workbench • Built with Gemini AI & Recharts</p>
      </footer>
    </div>
  );
};

export default App;
