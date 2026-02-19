export type FactorCategory =
  | 'Thématiques'
  | 'Organisationnels'
  | 'Relationnels'
  | 'Individuels'
  | 'Conséquences'

export type FactorEntry = {
  name: string
  category: FactorCategory
  description: string
}

export const FACTORS: Record<string, FactorEntry> = {
  // Thématiques d'agissements hostiles (T1-T10)
  T1: {
    name: 'Isolement et refus de communication',
    category: 'Thématiques',
    description: 'Mise au placard, exclusion des réunions, ostracisme, interdiction aux collègues de parler à la cible',
  },
  T2: {
    name: 'Atteinte aux conditions de travail',
    category: 'Thématiques',
    description: 'Objectifs inatteignables, tâches inutiles, consignes contradictoires, privation de travail, contrôle excessif',
  },
  T3: {
    name: 'Attaques personnelles',
    category: 'Thématiques',
    description: 'Humiliations, propos offensants, calomnies, rumeurs malveillantes, propos sexistes/racistes, moqueries',
  },
  T4: {
    name: 'Intimidations',
    category: 'Thématiques',
    description: 'Menaces de représailles, chantage, violence physique, atteintes aux biens, manifestations d\'hostilité visant à terroriser',
  },
  T5: {
    name: 'Empêchement de s\'exprimer',
    category: 'Thématiques',
    description: 'Interruptions, mépris comportemental (soupirs, tourner le dos), gestes menaçants, interdiction de répondre',
  },
  T6: {
    name: 'Discrédit du travail',
    category: 'Thématiques',
    description: 'Critiques incessantes, tâches ne correspondant pas aux compétences, propos disqualifiant l\'identité professionnelle',
  },
  T7: {
    name: 'Déconsidération auprès des collègues',
    category: 'Thématiques',
    description: 'Moqueries directes, rumeurs indirectes, médisances sournoises, disqualification publique',
  },
  T8: {
    name: 'Atteinte à la santé',
    category: 'Thématiques',
    description: 'Agressions physiques, verbales, psychologiques, comportements à connotation sexuelle',
  },
  T9: {
    name: 'Harcèlement sexuel',
    category: 'Thématiques',
    description: 'Propos/comportements à connotation sexuelle répétés, pression grave pour obtenir un acte sexuel',
  },
  T10: {
    name: 'Agissements sexistes',
    category: 'Thématiques',
    description: 'Propos ou comportements à connotation sexiste portant atteinte à la dignité ou créant une situation hostile',
  },

  // Facteurs organisationnels (FO1-FO10)
  FO1: {
    name: 'Management autoritaire',
    category: 'Organisationnels',
    description: 'Leadership autocratique, abus du lien de subordination, structures rigides, relations de pouvoir déséquilibrées',
  },
  FO2: {
    name: 'Inaction managériale',
    category: 'Organisationnels',
    description: 'Inaction des managers, absence de leadership, silence perçu comme acceptation du harcèlement',
  },
  FO3: {
    name: 'Conflit de rôle',
    category: 'Organisationnels',
    description: 'Attentes contradictoires envers l\'employé, injonctions paradoxales',
  },
  FO4: {
    name: 'Ambiguïté de rôle',
    category: 'Organisationnels',
    description: 'Incertitude sur les obligations de travail, règles imprécises, rôles indéfinis',
  },
  FO5: {
    name: 'Surcharge de travail',
    category: 'Organisationnels',
    description: 'Charge excessive générant frustration, peu de temps pour résoudre les conflits',
  },
  FO6: {
    name: 'Manque d\'autonomie',
    category: 'Organisationnels',
    description: 'Absence de latitude décisionnelle, micro-management',
  },
  FO7: {
    name: 'Changement organisationnel',
    category: 'Organisationnels',
    description: 'Restructurations, crises, licenciements, modification des tâches et responsabilités, insécurité',
  },
  FO8: {
    name: 'Injustice organisationnelle',
    category: 'Organisationnels',
    description: 'Sentiment d\'injustice dans les décisions, promotions, sanctions, rémunérations',
  },
  FO9: {
    name: 'Climat de travail délétère',
    category: 'Organisationnels',
    description: 'Relations professionnelles dégradées, peur, méfiance, compétition toxique',
  },
  FO10: {
    name: 'Conditions physiques de travail',
    category: 'Organisationnels',
    description: 'Exiguïté, bruit, températures inconfortables, environnement physique stressant',
  },

  // Facteurs relationnels et systémiques (FR1-FR6)
  FR1: {
    name: 'Déséquilibre des pouvoirs',
    category: 'Relationnels',
    description: 'Asymétrie de ressources entre les protagonistes, impossibilité de se défendre',
  },
  FR2: {
    name: 'Absence de soutien des collègues',
    category: 'Relationnels',
    description: 'Désolidarisation, silence des témoins, évitement, indifférence',
  },
  FR3: {
    name: 'Absence de soutien hiérarchique',
    category: 'Relationnels',
    description: 'La hiérarchie ne réagit pas, soutient le harceleur, ou participe aux agissements',
  },
  FR4: {
    name: 'Soutien organisationnel au harceleur',
    category: 'Relationnels',
    description: 'L\'organisation soutient activement le harceleur',
  },
  FR5: {
    name: 'Dynamique de bouc émissaire',
    category: 'Relationnels',
    description: 'La cible sert d\'intégrateur négatif pour canaliser l\'agressivité du groupe',
  },
  FR6: {
    name: 'Emprise psychique',
    category: 'Relationnels',
    description: 'Séduction initiale puis domination, manipulation, perte du libre arbitre, contrôle',
  },

  // Facteurs individuels (FI1-FI5)
  FI1: {
    name: 'Atypicité de la cible',
    category: 'Individuels',
    description: 'Différence, personnalité qui dérange, non-conformisme',
  },
  FI2: {
    name: 'Intégrité professionnelle',
    category: 'Individuels',
    description: 'Forte implication, refus des irrégularités, dénonciation des mauvaises pratiques',
  },
  FI3: {
    name: 'Statut protégé',
    category: 'Individuels',
    description: 'Délégué syndical, femme enceinte, personne difficilement licenciable',
  },
  FI4: {
    name: 'Fragilité temporaire',
    category: 'Individuels',
    description: 'Divorce, maladie, événement de vie fragilisant',
  },
  FI5: {
    name: 'Personnalité forte/opposante',
    category: 'Individuels',
    description: 'Résistance au formatage, forte personnalité',
  },

  // Conséquences observées (CS1-CS7)
  CS1: {
    name: 'Stress post-traumatique',
    category: 'Conséquences',
    description: 'Flashbacks, sidérations, réminiscences, reviviscences',
  },
  CS2: {
    name: 'Dépression',
    category: 'Conséquences',
    description: 'État dépressif (sévère 69%, léger 24%, modéré 7%)',
  },
  CS3: {
    name: 'Burnout',
    category: 'Conséquences',
    description: 'Épuisement émotionnel, dépersonnalisation, perte d\'accomplissement',
  },
  CS4: {
    name: 'Anxiété',
    category: 'Conséquences',
    description: 'Augmentation du niveau d\'anxiété, hypervigilance',
  },
  CS5: {
    name: 'Symptômes physiques',
    category: 'Conséquences',
    description: 'Troubles du sommeil, TMS, somatisations, douleurs',
  },
  CS6: {
    name: 'Impact professionnel',
    category: 'Conséquences',
    description: 'Perte d\'emploi, arrêts maladie, désengagement, intention de départ',
  },
  CS7: {
    name: 'Impact extra-professionnel',
    category: 'Conséquences',
    description: 'Effets sur la famille, le conjoint, les enfants',
  },
}
