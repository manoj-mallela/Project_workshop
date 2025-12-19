
import React from 'react';
import { AnalysisResult, Sentiment } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AnalysisCardProps {
  title: string;
  subtitle: string;
  icon: string;
  result: AnalysisResult | null;
  loading: boolean;
  color: string;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, subtitle, icon, result, loading, color }) => {
  if (loading) {
    return (
      <div className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm animate-pulse flex flex-col h-full`}>
        <div className="h-8 bg-slate-100 rounded w-3/4 mb-4"></div>
        <div className="flex-1 space-y-4">
          <div className="h-32 bg-slate-50 rounded"></div>
          <div className="h-4 bg-slate-100 rounded w-full"></div>
          <div className="h-4 bg-slate-100 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const isPositive = result.sentiment === Sentiment.POSITIVE;
  const isNegative = result.sentiment === Sentiment.NEGATIVE;
  
  const chartData = result.importantFeatures.slice(0, 5).map(f => ({
    name: f.word,
    weight: Math.abs(f.weight),
    originalWeight: f.weight
  }));

  return (
    <div className={`p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col h-full transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} text-white`}>
            <i className={`fas ${icon}`}></i>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{subtitle}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          isPositive ? 'bg-emerald-100 text-emerald-700' : 
          isNegative ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
        }`}>
          {result.sentiment}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-end justify-between mb-1">
          <span className="text-xs font-semibold text-slate-500 uppercase">Confidence Score</span>
          <span className="text-sm font-bold text-slate-800">{Math.round(Math.abs(result.score) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${isPositive ? 'bg-emerald-500' : isNegative ? 'bg-rose-500' : 'bg-slate-400'}`}
            style={{ width: `${Math.abs(result.score) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Top Feature Influences</p>
        <div className="h-40 w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: -20, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={80} style={{ fontSize: '10px' }} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="weight" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.originalWeight >= 0 ? '#10b981' : '#f43f5e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Model Reasoning</p>
        <p className="text-sm text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-100">
          "{result.explanation}"
        </p>
      </div>
    </div>
  );
};

export default AnalysisCard;
