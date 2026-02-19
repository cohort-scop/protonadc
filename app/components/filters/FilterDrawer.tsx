import { useState } from 'react';
import type { Testimony } from '~/data/testimonies';
import { groupFactorsByCategory, getCategoryColor, calculateFactorCounts } from '~/utils/testimony-helpers';

type FilterDrawerProps = {
  testimonies: Testimony[];
  selectedFactors: string[];
  onFactorToggle: (factorCode: string) => void;
  onClearFilters: () => void;
};

export default function FilterDrawer({
  testimonies,
  selectedFactors,
  onFactorToggle,
  onClearFilters,
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-20 z-40 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filtres
        {selectedFactors.length > 0 && (
          <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {selectedFactors.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed left-0 top-0 h-full w-96 bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-bold text-gray-900">Filtres</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Fermer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Clear button */}
          {selectedFactors.length > 0 && (
            <div className="p-4 border-b bg-gray-50">
              <button
                onClick={() => {
                  onClearFilters();
                  setIsOpen(false);
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Effacer tous les filtres ({selectedFactors.length})
              </button>
            </div>
          )}

          {/* Filter content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {Object.entries(groupedFactors).map(([category, factors]) => {
              const isCollapsed = collapsedCategories.has(category);
              const categoryColors = getCategoryColor(category);

              return (
                <div key={category} className="border-2 rounded-lg">
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`
                      w-full p-3 flex justify-between items-center
                      ${isCollapsed ? 'hover:bg-gray-50' : categoryColors.bg}
                    `}
                  >
                    <span className={`font-bold ${categoryColors.text}`}>
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
                    <div className="p-3 pt-0 space-y-1 border-t">
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
      </div>
    </>
  );
}
