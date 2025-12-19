
import React from 'react';

const PipelineExplainer: React.FC = () => {
  const steps = [
    { title: "Raw Text", icon: "fa-font", desc: "Input review from user or dataset." },
    { title: "Tokenization", icon: "fa-scissors", desc: "Splitting sentences into individual words/tokens." },
    { title: "Stop-word Removal", icon: "fa-filter", desc: "Removing high-frequency, low-info words (the, is, at)." },
    { title: "Vectorization", icon: "fa-hashtag", desc: "Converting text to numerical vectors (Lexicon or TF-IDF)." },
    { title: "Classification", icon: "fa-brain", desc: "Applying logic or ML models to predict sentiment." }
  ];

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-8">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <i className="fas fa-microchip text-indigo-500"></i>
        The NLP Pipeline
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <i className={`fas ${step.icon}`}></i>
            </div>
            <h3 className="font-bold text-sm text-slate-800 mb-1">{step.title}</h3>
            <p className="text-xs text-slate-500 px-2 leading-tight">{step.desc}</p>
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute h-0.5 bg-slate-100 w-1/5 top-6 left-[calc(20%*${idx}+15%)] z-[-1]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineExplainer;
