import { useState } from 'react'
import { useLoaderData } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { findAllTestimonies, findProjectName } from '~/lib/testimony.repository'
import TestimonySidebar from '~/components/TestimonySidebar'
import TestimonyList from '~/components/TestimonyList'
import OverviewStats from '~/components/OverviewStats'
import AppHeader from '~/components/AppHeader'
import InfoModal from '~/components/InfoModal'
import FilterGroup from '~/components/FilterGroup'
import { requireAuth } from '~/lib/auth.server'
import { filterTestimoniesByFactors, calculateFactorCounts, getCategoryColor, getFactorLabel } from '~/utils/testimony-helpers'
import { FACTORS } from '~/constants/factors'

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request)
  const [testimonies, projectName] = await Promise.all([findAllTestimonies(), findProjectName()])
  return { testimonies, projectName }
}

const STATUS_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'Victime directe': { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700' },
  'Temoin': { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-700' },
  'Victime et temoin': { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-700' },
}

const TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'AGISSEMENT DIRECT': { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-800' },
  'TÉMOIN INDIRECT': { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-800' },
  'CONTEXTE STRUCTUREL': { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-800' },
  'DÉCHARGE': { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800' },
  'DIRECT ET STRUCTUREL': { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-800' },
}

const CATEGORIES = ['Thématiques', 'Organisationnels', 'Relationnels', 'Individuels', 'Conséquences']

export default function TestiMobilePage() {
  const { testimonies, projectName } = useLoaderData<typeof loader>()

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedFactors, setSelectedFactors] = useState<string[]>([])
  const [selectedTestimonyId, setSelectedTestimonyId] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showOverview, setShowOverview] = useState(false)
  const [openModal, setOpenModal] = useState<'statut' | 'type' | null>(null)

  const allStatuses = [...new Set(testimonies.map(t => t.status))]
  const allTypes = [...new Set(testimonies.map(t => t.type))]
  const factorCounts = calculateFactorCounts(testimonies)

  const filtered = filterTestimoniesByFactors(testimonies, selectedFactors)
    .filter(t => selectedStatuses.length === 0 || selectedStatuses.includes(t.status))
    .filter(t => selectedTypes.length === 0 || selectedTypes.includes(t.type))

  const selectedTestimony = selectedTestimonyId
    ? (testimonies.find(t => t.id === selectedTestimonyId) ?? null)
    : null

  const activeFiltersCount = selectedStatuses.length + selectedTypes.length + selectedFactors.length

  const toggleStatus = (s: string) =>
    setSelectedStatuses(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const toggleType = (t: string) =>
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const toggleFactor = (code: string) =>
    setSelectedFactors(prev => prev.includes(code) ? prev.filter(x => x !== code) : [...prev, code])

  return (
    <div className="min-h-screen bg-gray-50 md:bg-gradient-to-br md:from-gray-50 md:to-gray-100">

      <AppHeader title="Témoignages" projectName={projectName} />

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 py-6">

        {/* Vue d'ensemble */}
        <OverviewStats
          testimonies={filtered}
          selectedFactors={selectedFactors}
          onFactorClick={toggleFactor}
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

        {/* Liste desktop */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {filtered.length} témoignage{filtered.length > 1 ? 's' : ''}
            {activeFiltersCount > 0 && (
              <span className="text-gray-400 font-normal text-base"> sur {testimonies.length}</span>
            )}
          </h2>
          <TestimonyList
            testimonies={filtered}
            selectedFactors={selectedFactors}
            selectedTestimonyId={selectedTestimonyId}
            onTestimonyClick={id => setSelectedTestimonyId(id)}
          />
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="md:hidden">

        {/* Boutons + compteur */}
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOverview(f => !f)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  showOverview || selectedFactors.length > 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Vue d'ensemble
                {selectedFactors.length > 0 && (
                  <span className="bg-white text-blue-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {selectedFactors.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowFilters(f => !f)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  showFilters || (selectedStatuses.length + selectedTypes.length) > 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filtres
                {(selectedStatuses.length + selectedTypes.length) > 0 && (
                  <span className="bg-white text-blue-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {selectedStatuses.length + selectedTypes.length}
                  </span>
                )}
              </button>
            </div>

            <span className="text-xs text-gray-500">
              {filtered.length} témoignage{filtered.length > 1 ? 's' : ''}
              {activeFiltersCount > 0 && ' · filtrés'}
            </span>
          </div>

          {/* Panel Vue d'ensemble */}
          {showOverview && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              {CATEGORIES.map(category => {
                const codesInCategory = Object.entries(FACTORS)
                  .filter(([, entry]) => entry.category === category)
                  .map(([code]) => code)
                  .filter(code => factorCounts[code] > 0)
                if (codesInCategory.length === 0) return null
                const colors = getCategoryColor(category)
                return (
                  <div key={category}>
                    <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${colors.text}`}>
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {codesInCategory.map(code => {
                        const active = selectedFactors.includes(code)
                        return (
                          <button
                            key={code}
                            onClick={() => toggleFactor(code)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium border transition-all ${
                              active
                                ? `${colors.bg} ${colors.border} ${colors.text}`
                                : 'bg-white border-gray-200 text-gray-600'
                            }`}
                          >
                            <span className={`font-mono font-bold ${active ? colors.text : 'text-gray-400'}`}>{code}</span>
                            <span>{getFactorLabel(code)}</span>
                            <span className={`font-bold ${active ? colors.text : 'text-gray-400'}`}>{factorCounts[code]}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
              {selectedFactors.length > 0 && (
                <button onClick={() => setSelectedFactors([])} className="text-xs text-blue-600 font-medium">
                  Effacer les facteurs
                </button>
              )}
            </div>
          )}

          {/* Panel Filtres */}
          {showFilters && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              <FilterGroup
                label="Statut"
                items={allStatuses.map(s => ({ value: s, count: testimonies.filter(t => t.status === s).length }))}
                selected={selectedStatuses}
                colors={STATUS_COLORS}
                onToggle={toggleStatus}
                onInfo={() => setOpenModal('statut')}
                compact
              />
              <FilterGroup
                label="Type"
                items={allTypes.map(t => ({ value: t, count: testimonies.filter(x => x.type === t).length }))}
                selected={selectedTypes}
                colors={TYPE_COLORS}
                onToggle={toggleType}
                onInfo={() => setOpenModal('type')}
                compact
              />
              {(selectedStatuses.length + selectedTypes.length) > 0 && (
                <button
                  onClick={() => { setSelectedStatuses([]); setSelectedTypes([]) }}
                  className="text-xs text-blue-600 font-medium"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          )}
        </div>

        {/* Cartes mobile */}
        <div className="px-4 pb-8 space-y-3">
          {filtered.map(t => {
            const sc = STATUS_COLORS[t.status] ?? { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700' }
            const tc = TYPE_COLORS[t.type] ?? { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-600' }
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTestimonyId(t.id)}
                className="w-full text-left bg-white rounded-xl border border-gray-200 shadow-sm p-4 active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-gray-900 text-sm">{t.firstName} {t.lastName}</p>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${sc.bg} ${sc.border} ${sc.text}`}>
                    {t.status}
                  </span>
                </div>
                <span className={`inline-block text-xs px-2 py-0.5 rounded-full border font-medium mb-2 ${tc.bg} ${tc.border} ${tc.text}`}>
                  {t.type}
                </span>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{t.content.slice(0, 120)}…</p>
                {t.factors.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {t.factors.slice(0, 4).map(f => (
                      <span key={f} className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono">{f}</span>
                    ))}
                    {t.factors.length > 4 && (
                      <span className="text-xs text-gray-400">+{t.factors.length - 4}</span>
                    )}
                  </div>
                )}
              </button>
            )
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">Aucun témoignage ne correspond aux filtres</p>
            </div>
          )}
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
            { label: 'Agissement direct', color: 'text-red-800', desc: "Le témoin décrit des agissements dont il a été personnellement la cible." },
            { label: 'Décharge', color: 'text-green-800', desc: "Le témoin atteste n'avoir jamais constaté d'agissements problématiques." },
            { label: 'Direct et structurel', color: 'text-purple-800', desc: "Le témoignage combine une expérience personnelle et des observations structurelles." },
            { label: 'Témoin indirect', color: 'text-gray-700', desc: "Le témoin décrit des faits observés sur des collègues sans en avoir été victime directe." },
            { label: 'Contexte structurel', color: 'text-indigo-800', desc: "Le témoignage porte principalement sur le contexte organisationnel ou managérial." },
          ]}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  )
}
