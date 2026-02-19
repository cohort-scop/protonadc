import { useState } from 'react';
import type { Testimony } from '~/data/testimonies';
import { groupFactorsByCategory, getCategoryColor, calculateFactorCounts } from '~/utils/testimony-helpers';

type FilterAccordionProps = {
  testimonies: Testimony[];
  selectedFactors: string[];
  onFactorToggle: (factorCode: string) => void;
  onClearFilters: () => void;
};

export default function FilterAccordion({
  testimonies,
  selectedFactors,
  onFactorToggle,
  onClearFilters,
}: FilterAccordionProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Thématiques');
  const groupedFactors = groupFactorsByCategory();
  const factorCounts = calculateFactorCounts(testimonies);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow p-4 h-fit sticky top-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Filtres</h3>
        {selectedFactors.length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Effacer tout
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {Object.entries(groupedFactors).map(([category, factors]) => {
          const isExpanded = expandedCategory === category;
          const categoryColors = getCategoryColor(category);

          return (
            <div key={category} className={`border-2 rounded-lg ${categoryColors.border}`}>
              <button
                onClick={() => toggleCategory(category)}
                className={`
                  w-full p-4 flex justify-between items-center
                  ${isExpanded ? categoryColors.bg : 'hover:bg-gray-50'}
                `}
              >
                <span className={`font-bold ${categoryColors.text}`}>
                  {category}
                </span>
                <svg
                  className={`w-6 h-6 transition-transform ${categoryColors.text} ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isExpanded && (
                <div className="p-4 pt-0 space-y-1 border-t">
                  {factors.map((factor) => {
                    const count = factorCounts[factor.code] || 0;
                    const isSelected = selectedFactors.includes(factor.code);

                    return (
                      <label
                        key={factor.code}
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onFactorToggle(factor.code)}
                          className="w-4 h-4"
                        />
                        <div className="flex-1 flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-900">
                            {factor.code} - {factor.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({count})
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
