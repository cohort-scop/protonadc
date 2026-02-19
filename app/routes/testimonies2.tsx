import { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { filterTestimoniesByFactors } from '~/utils/testimony-helpers';
import { findAllTestimonies } from '~/lib/testimony.repository';
import OverviewStats from '~/components/OverviewStats';
import TestimonyList from '~/components/TestimonyList';
import TestimonySidebar from '~/components/TestimonySidebar';

export async function loader() {
  const testimonies = await findAllTestimonies();
  return { testimonies };
}

export function meta() {
  return [
    { title: 'Témoignages (DB) - Application de consultation' },
    { name: 'description', content: 'Consultation des témoignages depuis la base de données' },
  ];
}

export default function Testimonies2Page() {
  const { testimonies } = useLoaderData<typeof loader>();

  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [selectedTestimonyId, setSelectedTestimonyId] = useState<string | null>(null);

  const selectedTestimony = selectedTestimonyId
    ? testimonies.find((t) => t.id === selectedTestimonyId) || null
    : null;

  const filteredTestimonies = filterTestimoniesByFactors(testimonies, selectedFactors);

  const handleFactorToggle = (factorCode: string) => {
    setSelectedFactors((prev) =>
      prev.includes(factorCode)
        ? prev.filter((f) => f !== factorCode)
        : [...prev, factorCode]
    );
  };

  const handleClearFilters = () => setSelectedFactors([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Témoignages
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Données depuis la base PostgreSQL
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/chronologie2"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium hidden sm:inline">Chronologie</span>
              </Link>

            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <OverviewStats
          testimonies={filteredTestimonies}
          selectedFactors={selectedFactors}
          onFactorClick={handleFactorToggle}
        />

        <div className="flex gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {filteredTestimonies.length} témoignage{filteredTestimonies.length > 1 ? 's' : ''}
                  {selectedFactors.length > 0 && (
                    <span className="text-blue-600"> · {selectedFactors.length} filtre{selectedFactors.length > 1 ? 's' : ''}</span>
                  )}
                </h2>
              </div>

              <TestimonyList
                testimonies={filteredTestimonies}
                selectedFactors={selectedFactors}
                selectedTestimonyId={selectedTestimonyId}
                onTestimonyClick={(id) => setSelectedTestimonyId(id)}
              />
            </div>
          </div>
        </div>

      </div>

      <TestimonySidebar
        testimony={selectedTestimony}
        onClose={() => setSelectedTestimonyId(null)}
      />
    </div>
  );
}
