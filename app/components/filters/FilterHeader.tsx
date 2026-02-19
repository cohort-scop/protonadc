import { useState, useRef, useEffect } from 'react';
import type { Testimony } from '~/data/testimonies';
import { groupFactorsByCategory, getCategoryColor, calculateFactorCounts, getFactorColor } from '~/utils/testimony-helpers';

type FilterHeaderProps = {
  testimonies: Testimony[];
  selectedFactors: string[];
  onFactorToggle: (factorCode: string) => void;
  onClearFilters: () => void;
};

export default function FilterHeader({
  testimonies,
  selectedFactors,
  onFactorToggle,
  onClearFilters,
}: FilterHeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const groupedFactors = groupFactorsByCategory();
  const factorCounts = calculateFactorCounts(testimonies);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (category: string) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900">Filtres</h3>
        {selectedFactors.length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Effacer tout ({selectedFactors.length})
          </button>
        )}
      </div>

      <div ref={dropdownRef} className="flex flex-wrap gap-3 mb-3">
        {Object.entries(groupedFactors).map(([category, factors]) => {
          const isOpen = openDropdown === category;
          const categoryColors = getCategoryColor(category);

          return (
            <div key={category} className="relative">
              <button
                onClick={() => toggleDropdown(category)}
                className={`
                  px-4 py-2 rounded-lg border-2 font-semibold
                  flex items-center gap-2
                  ${isOpen ? `${categoryColors.bg} ${categoryColors.border}` : 'bg-white border-gray-300'}
                  ${categoryColors.text}
                  hover:${categoryColors.bg}
                `}
              >
                {category}
                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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

              {isOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border-2 border-gray-200 z-10 w-96 max-h-96 overflow-y-auto">
                  <div className="p-3 space-y-1">
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
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedFactors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFactors.map((factorCode) => {
            const colors = getFactorColor(factorCode);

            return (
              <div
                key={factorCode}
                className={`
                  px-3 py-1 rounded-full border flex items-center gap-2
                  ${colors.bg} ${colors.text} ${colors.border}
                `}
              >
                <span className="text-xs font-medium">{factorCode}</span>
                <button
                  onClick={() => onFactorToggle(factorCode)}
                  className="hover:opacity-70"
                  aria-label={`Retirer ${factorCode}`}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
