import { useState } from 'react';
import type { Testimony } from '~/data/testimonies';
import { calculateFactorCounts, getFactorLabel, getCategoryColor } from '~/utils/testimony-helpers';
import { FACTORS } from '~/constants/factors';

type OverviewStatsProps = {
  testimonies: Testimony[];
  selectedFactors: string[];
  onFactorClick: (factorCode: string) => void;
};

const CATEGORIES = ['Thématiques', 'Organisationnels', 'Relationnels', 'Individuels', 'Conséquences'];

export default function OverviewStats({ testimonies, selectedFactors, onFactorClick }: OverviewStatsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReferential, setShowReferential] = useState(false);
  const factorCounts = calculateFactorCounts(testimonies);

  const categorySummary = CATEGORIES.map((category) => {
    const count = Object.entries(FACTORS)
      .filter(([, entry]) => entry.category === category)
      .filter(([code]) => factorCounts[code] > 0)
      .length;
    return { category, count };
  }).filter(({ count }) => count > 0);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-8 mb-6 border border-blue-100">

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group cursor-pointer rounded-lg px-2 py-1 -mx-2 -my-1 hover:bg-blue-100/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors">
            Vue d'ensemble
          </h2>
          <svg
            className={`w-5 h-5 text-gray-400 group-hover:text-blue-700 transition-all ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <p className="text-gray-700 mt-2 text-xl" style={{ minHeight: '3.5rem' }}>
          <span className="font-semibold text-blue-600">{testimonies.length}</span> témoignage{testimonies.length > 1 ? 's' : ''}{' • '}
          {categorySummary.map(({ category, count }, i) => {
            const colors = getCategoryColor(category);
            return (
              <span key={category}>
                <span className={`font-semibold ${colors.text}`}>{count}</span>
                {' '}<span className="text-gray-500">{category === 'Conséquences' ? (count > 1 ? 'conséquences' : 'conséquence') : `facteur${count > 1 ? 's' : ''} ${count > 1 ? category.toLowerCase() : category.toLowerCase().replace(/s$/, '')}`}</span>
                {i < categorySummary.length - 1 && <span className="text-gray-300 mx-1">·</span>}
              </span>
            );
          })}
        </p>
      </button>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-blue-200 space-y-4" onClick={(e) => e.stopPropagation()}>
          {CATEGORIES.map((category) => {
            const codesInCategory = Object.entries(FACTORS)
              .filter(([, entry]) => entry.category === category)
              .map(([code]) => code)
              .filter((code) => factorCounts[code] > 0);

            if (codesInCategory.length === 0) return null;

            const colors = getCategoryColor(category);

            return (
              <div key={category}>
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${colors.text}`}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {codesInCategory.map((code) => {
                    const count = factorCounts[code];
                    const isSelected = selectedFactors.includes(code);
                    return (
                      <button
                        key={code}
                        onClick={() => onFactorClick(code)}
                        className={`
                          flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all
                          ${isSelected
                            ? `${colors.bg} ${colors.border} ${colors.text} border-2`
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm cursor-pointer'
                          }
                        `}
                      >
                        <span className={`font-semibold text-xs ${isSelected ? colors.text : 'text-gray-400'}`}>{code}</span>
                        <span>{getFactorLabel(code)}</span>
                        <span className={`font-bold text-xs px-1.5 py-0.5 rounded-full ${isSelected ? colors.bg : 'bg-gray-100'} ${isSelected ? colors.text : 'text-gray-500'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="pt-4 border-t border-blue-200 flex justify-end">
            <button
              onClick={() => setShowReferential(true)}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Référentiel des facteurs
            </button>
          </div>
        </div>
      )}

      {showReferential && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowReferential(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">Référentiel des facteurs</h2>

            {CATEGORIES.map((category) => {
              const colors = getCategoryColor(category);
              const entries = Object.entries(FACTORS).filter(([, entry]) => entry.category === category);
              return (
                <div key={category} className="mb-6">
                  <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${colors.text}`}>{category}</h3>
                  <div className="space-y-3">
                    {entries.map(([code, entry]) => (
                      <div key={code}>
                        <p className="text-sm font-semibold text-gray-800">
                          <span className={`text-xs font-bold mr-1.5 ${colors.text}`}>{code}</span>
                          {entry.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">{entry.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => setShowReferential(false)}
              className="mt-2 w-full text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg py-2 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
