import { useState } from 'react';
import type { Testimony } from '~/data/testimonies';
import { groupFactorsByCategory, getCategoryColor, calculateFactorCounts } from '~/utils/testimony-helpers';

type FilterSidebarFixedProps = {
  testimonies: Testimony[];
  selectedFactors: string[];
  onFactorToggle: (factorCode: string) => void;
  onClearFilters: () => void;
};

export default function FilterSidebarFixed({
  testimonies,
  selectedFactors,
  onFactorToggle,
  onClearFilters,
}: FilterSidebarFixedProps) {
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const groupedFactors = groupFactorsByCategory();
  const factorCounts = calculateFactorCounts(testimonies);

  const toggleCategory = (category: string) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category);
    } else {
      newCollapsed.add(category);
    }
    setCollapsedCategories(newCollapsed);
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

      <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        {Object.entries(groupedFactors).map(([category, factors]) => {
          const isCollapsed = collapsedCategories.has(category);
          const categoryColors = getCategoryColor(category);

          return (
            <div key={category} className="border rounded-lg">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-3 flex justify-between items-center hover:bg-gray-50"
              >
                <span className={`font-semibold ${categoryColors.text}`}>
                  {category}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform ${isCollapsed ? '' : 'rotate-180'}`}
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

              {!isCollapsed && (
                <div className="p-3 pt-0 space-y-1">
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
                          <span className="text-sm font-medium text-gray-900">
                            {factor.code} - {factor.name}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">({count})</span>
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
