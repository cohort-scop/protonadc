import { useState } from 'react';
import type { Testimony } from '~/data/testimonies';
import { getFactorLabel, getFactorColor } from '~/utils/testimony-helpers';
import { FACTORS } from '~/constants/factors';
import Markdown from 'react-markdown';

type TestimonySidebarProps = {
  testimony: Testimony | null;
  onClose: () => void;
};

export default function TestimonySidebar({ testimony, onClose }: TestimonySidebarProps) {
  const [activeTab, setActiveTab] = useState<'resume' | 'temoignage'>('resume');

  if (!testimony) {
    return null;
  }

  return (
    <>
      {/* Overlay transparent cliquable pour fermer la sidebar */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-[1px]"
        onClick={onClose}
        aria-label="Fermer le panneau"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      />

      <div className="fixed right-0 top-0 h-full w-full md:w-1/2 lg:w-2/5 bg-white shadow-2xl overflow-y-auto animate-slide-in z-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {testimony.firstName} {testimony.lastName}
            {testimony.ruj && (
              <span className="ml-2 text-base font-normal text-gray-400">{testimony.ruj}</span>
            )}
          </h2>
          <div className="flex gap-2 mt-2">
            <span className="inline-block px-3 py-1 text-sm rounded bg-gray-100 text-gray-700">
              {testimony.status}
            </span>
            <span className="inline-block px-3 py-1 text-sm rounded bg-gray-700 text-white">
              {testimony.type}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fermer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-6">
        {testimony.factors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Facteurs associés</h3>
            <div className="flex flex-wrap gap-2">
              {testimony.factors.map((factorCode) => {
                const colors = getFactorColor(factorCode);
                return (
                  <div
                    key={factorCode}
                    className={`
                      px-3 py-2 rounded border
                      ${colors.bg} ${colors.text} ${colors.border}
                    `}
                    title={FACTORS[factorCode]?.description}
                  >
                    <div className="font-semibold text-sm">{factorCode}</div>
                    <div className="text-xs mt-0.5">{getFactorLabel(factorCode)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-4">
            <button
              onClick={() => setActiveTab('resume')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activeTab === 'resume'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Résumé
            </button>
            <button
              onClick={() => setActiveTab('temoignage')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activeTab === 'temoignage'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Témoignage
            </button>
          </div>

          {activeTab === 'resume' && (
            <ul className="divide-y divide-gray-100">
              {(testimony.facts ?? []).length > 0 ? (
                (testimony.facts ?? []).map((fact, i) => (
                  <li key={i} className="flex gap-3 py-3 text-sm text-gray-600 leading-relaxed">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-gray-100 text-gray-400 text-xs font-medium flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{fact}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400 italic py-3">Aucun résumé disponible.</li>
              )}
            </ul>
          )}

          {activeTab === 'temoignage' && (
            <div className="prose prose-sm max-w-none">
              <Markdown>{testimony.content}</Markdown>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500">
          Ajouté le {testimony.dateAdded.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </div>
    </>
  );
}
