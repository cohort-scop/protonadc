import { useState } from 'react';
import { useLoaderData } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { filterTestimoniesByFactors } from '~/utils/testimony-helpers';
import { findAllTestimonies, findProjectName } from '~/lib/testimony.repository';
import OverviewStats from '~/components/OverviewStats';
import TestimonyList from '~/components/TestimonyList';
import TestimonySidebar from '~/components/TestimonySidebar';
import AppNav from '~/components/AppNav';
import InfoModal from '~/components/InfoModal';
import FilterGroup from '~/components/FilterGroup';
import { requireAuth } from '~/lib/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  const [testimonies, projectName] = await Promise.all([findAllTestimonies(), findProjectName()]);
  return { testimonies, projectName };
}

export function meta() {
  return [
    { title: 'Témoignages - Application de consultation' },
    { name: 'description', content: 'Consultation des témoignages sur les conditions de travail' },
  ];
}

const STATUS_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'Victime directe': { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700' },
  'Temoin': { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-700' },
  'Victime et temoin': { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-700' },
};

const TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'AGISSEMENT DIRECT': { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800' },
  'TÉMOIN INDIRECT': { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-800' },
  'CONTEXTE STRUCTUREL': { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-800' },
  'DÉCHARGE': { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800' },
  'DIRECT ET STRUCTUREL': { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-800' },
};

export default function TestimoniesPage() {
  const { testimonies, projectName } = useLoaderData<typeof loader>();

  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTestimonyId, setSelectedTestimonyId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<'statut' | 'type' | null>(null);

  const selectedTestimony = selectedTestimonyId
    ? testimonies.find((t) => t.id === selectedTestimonyId) || null
    : null;

  const allStatuses = [...new Set(testimonies.map((t) => t.status))];
  const allTypes = [...new Set(testimonies.map((t) => t.type))];

  const toggleStatus = (s: string) =>
    setSelectedStatuses((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const toggleType = (t: string) =>
    setSelectedTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const filteredTestimonies = filterTestimoniesByFactors(testimonies, selectedFactors)
    .filter((t) => selectedStatuses.length === 0 || selectedStatuses.includes(t.status))
    .filter((t) => selectedTypes.length === 0 || selectedTypes.includes(t.type));

  const handleFactorClick = (factorCode: string) => {
    setSelectedFactors((prev) =>
      prev.includes(factorCode) ? prev.filter((f) => f !== factorCode) : [...prev, factorCode]
    );
  };

  const hasFilters = selectedStatuses.length > 0 || selectedTypes.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Témoignages</h1>
              {projectName && <p className="text-gray-600 mt-2 text-lg">{projectName}</p>}
            </div>
            <AppNav />
          </div>
        </div>
      </header>


      <div className="max-w-7xl mx-auto px-6 py-6">

        <OverviewStats
          testimonies={filteredTestimonies}
          selectedFactors={selectedFactors}
          onFactorClick={handleFactorClick}
        />

        {/* Statut + Type */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <FilterGroup
            label="Statut"
            items={allStatuses.map(s => ({ value: s, count: testimonies.filter(t => t.status === s).length }))}
            selected={selectedStatuses}
            colors={STATUS_COLORS}
            onToggle={toggleStatus}
            onInfo={() => setOpenModal('statut')}
            onClear={() => setSelectedStatuses([])}
          />
          <FilterGroup
            label="Type"
            items={allTypes.map(t => ({ value: t, count: testimonies.filter(x => x.type === t).length }))}
            selected={selectedTypes}
            colors={TYPE_COLORS}
            onToggle={toggleType}
            onInfo={() => setOpenModal('type')}
            onClear={() => setSelectedTypes([])}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {filteredTestimonies.length} témoignage{filteredTestimonies.length > 1 ? 's' : ''}
            {hasFilters && (
              <span className="text-gray-400 font-normal text-base"> sur {testimonies.length}</span>
            )}
          </h2>
          <TestimonyList
            testimonies={filteredTestimonies}
            selectedFactors={selectedFactors}
            selectedTestimonyId={selectedTestimonyId}
            onTestimonyClick={(id) => setSelectedTestimonyId(id)}
          />
        </div>
      </div>

      <TestimonySidebar testimony={selectedTestimony} onClose={() => setSelectedTestimonyId(null)} />

      {openModal === 'statut' && (
        <InfoModal
          title="Statuts des témoins"
          items={[
            { label: 'Victime directe', color: 'text-red-700', desc: "Personne qui déclare avoir personnellement subi les agissements décrits dans l'enquête." },
            { label: 'Témoin', color: 'text-amber-700', desc: "Personne qui témoigne de faits observés sur d'autres collègues, sans avoir été elle-même directement ciblée." },
            { label: 'Victime et témoin', color: 'text-orange-700', desc: "Personne à la fois victime directe des agissements et témoin de faits similaires subis par d'autres." },
          ]}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === 'type' && (
        <InfoModal
          title="Types de témoignage"
          items={[
            { label: 'Agissement direct', color: 'text-red-800', desc: "Le témoin décrit des agissements dont il a été personnellement la cible : comportements hostiles, pression, humiliation, intimidation…" },
            { label: 'Décharge', color: 'text-green-800', desc: "Le témoin atteste n'avoir jamais constaté d'agissements problématiques de la part du mis en cause et livre un témoignage positif." },
            { label: 'Direct et structurel', color: 'text-purple-800', desc: "Le témoignage combine une expérience personnelle d'agissements et des observations structurelles ou sur des tiers." },
            { label: 'Témoin indirect', color: 'text-gray-700', desc: "Le témoin décrit des faits observés sur des collègues sans en avoir été lui-même victime directe." },
            { label: 'Contexte structurel', color: 'text-indigo-800', desc: "Le témoignage porte principalement sur le contexte organisationnel, managérial ou culturel, sans décrire d'agissements ciblés." },
          ]}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
}
