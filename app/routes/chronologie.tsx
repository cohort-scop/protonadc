import { useState } from 'react';
import { Link } from 'react-router';
import { MOCK_TESTIMONIES } from '~/data/testimonies';
import Timeline from '~/components/Timeline';
import TestimonySidebar from '~/components/TestimonySidebar';

export function meta() {
  return [
    { title: 'Chronologie - Témoignages' },
    { name: 'description', content: 'Vue chronologique des événements' },
  ];
}

export default function ChronologiePage() {
  const [selectedTestimonyId, setSelectedTestimonyId] = useState<string | null>(null);

  const selectedTestimony = selectedTestimonyId
    ? MOCK_TESTIMONIES.find((t) => t.id === selectedTestimonyId) || null
    : null;

  const handleTestimonyClick = (id: string) => {
    setSelectedTestimonyId(id);
  };

  const handleCloseSidebar = () => {
    setSelectedTestimonyId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Chronologie
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Vue temporelle des événements
              </p>
            </div>

            {/* Navigation entre les vues */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <span className="font-medium">Vue liste</span>
              </Link>

              <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Chronologie
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Info card */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <span className="font-bold">{MOCK_TESTIMONIES.length} événements</span> ordonnés chronologiquement du plus ancien au plus récent
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="pb-12">
        <Timeline
          testimonies={MOCK_TESTIMONIES}
          selectedTestimonyId={selectedTestimonyId}
          onTestimonyClick={handleTestimonyClick}
        />
      </div>

      {/* Sidebar */}
      <TestimonySidebar testimony={selectedTestimony} onClose={handleCloseSidebar} />
    </div>
  );
}
