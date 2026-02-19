export type TestimonyStatus = 'témoin' | 'victime directe' | 'Victime et témoin';

export type TestimonyType =
  | 'AGISSEMENT DIRECT'
  | 'TEMOIN INDIRECT'
  | 'CONTEXTE STRUCTUREL'
  | 'DÉCHARGE'
  | 'DIRECT ET STRUCTUREL';

export type FactorCategory = 'Thématiques' | 'Organisationnels' | 'Relationnels' | 'Individuels';

export type Factor = {
  code: string;
  category: FactorCategory;
  label: string;
  description: string;
  source?: string;
};

export type DatePrecision = 'day' | 'month' | 'year';

export type Testimony = {
  id: string;
  ruj?: string;
  firstName: string;
  lastName: string;
  status: TestimonyStatus;
  type: TestimonyType;
  content: string;
  facts: string[];
  factors: string[];
  dateAdded: Date;
  eventDate: Date; // Date de l'événement décrit dans le témoignage
  datePrecision?: DatePrecision; // Précision de la date (jour, mois, ou année uniquement)
};

// Liste complète des facteurs
export const FACTORS: Factor[] = [
  // Thématiques (T1-T10)
  {
    code: 'T1',
    category: 'Thématiques',
    label: 'Isolement et refus de communication',
    description: 'Mise au placard, exclusion des réunions, ostracisme, interdiction aux collègues de parler à la cible',
    source: 'Hirigoyen (2017), Leymann (1996)',
  },
  {
    code: 'T2',
    category: 'Thématiques',
    label: 'Atteinte aux conditions de travail',
    description: 'Objectifs inatteignables, tâches inutiles, consignes contradictoires, privation de travail',
    source: 'Hirigoyen (2017), Leymann (1996)',
  },
  {
    code: 'T3',
    category: 'Thématiques',
    label: 'Attaques personnelles',
    description: 'Humiliations, propos offensants, calomnies, rumeurs malveillantes, propos sexistes/racistes',
    source: 'Hirigoyen (2017), Leymann (1996)',
  },
  {
    code: 'T4',
    category: 'Thématiques',
    label: 'Intimidations',
    description: 'Menaces de représailles, chantage, violence physique, atteintes aux biens',
    source: 'Hirigoyen (2017), Leymann (1996)',
  },
  {
    code: 'T5',
    category: 'Thématiques',
    label: 'Empêchement de s\'exprimer',
    description: 'Interruptions, mépris comportemental, gestes menaçants, bruits parasites',
    source: 'Leymann (1996)',
  },
  {
    code: 'T6',
    category: 'Thématiques',
    label: 'Discrédit du travail',
    description: 'Critiques incessantes, tâches ne correspondant pas aux compétences',
    source: 'Leymann (1996)',
  },
  {
    code: 'T7',
    category: 'Thématiques',
    label: 'Déconsidération auprès des collègues',
    description: 'Moqueries directes, rumeurs indirectes, médisances sournoises',
    source: 'Leymann (1996)',
  },
  {
    code: 'T8',
    category: 'Thématiques',
    label: 'Atteinte à la santé',
    description: 'Agressions physiques, verbales, psychologiques, comportements à connotation sexuelle',
    source: 'Leymann (1996)',
  },
  {
    code: 'T9',
    category: 'Thématiques',
    label: 'Harcèlement sexuel',
    description: 'Propos/comportements à connotation sexuelle répétés, pression grave',
    source: 'Lepastier & Allilaire (2004)',
  },
  {
    code: 'T10',
    category: 'Thématiques',
    label: 'Agissements sexistes',
    description: 'Propos ou comportements à connotation sexiste portant atteinte à la dignité',
    source: 'Code du travail L.1142-2-1',
  },
  // Organisationnels (FO1-FO10)
  {
    code: 'FO1',
    category: 'Organisationnels',
    label: 'Management autoritaire',
    description: 'Leadership autocratique, abus du lien de subordination, structures rigides',
    source: 'Poilpot-Rocaboy (2010)',
  },
  {
    code: 'FO2',
    category: 'Organisationnels',
    label: 'Inaction managériale',
    description: 'Inaction des managers, absence de leadership, silence perçu comme acceptation',
    source: 'Skogstad et al. (2007)',
  },
  {
    code: 'FO3',
    category: 'Organisationnels',
    label: 'Conflit de rôle',
    description: 'Attentes contradictoires envers l\'employé, injonctions paradoxales',
    source: 'Baillien & De Witte (2009)',
  },
  {
    code: 'FO4',
    category: 'Organisationnels',
    label: 'Ambiguïté de rôle',
    description: 'Incertitude sur les obligations de travail, règles imprécises',
    source: 'Baillien & De Witte (2009)',
  },
  {
    code: 'FO5',
    category: 'Organisationnels',
    label: 'Surcharge de travail',
    description: 'Charge excessive générant frustration, peu de temps pour résoudre les conflits',
    source: 'Hoel & Cooper (2000)',
  },
  {
    code: 'FO6',
    category: 'Organisationnels',
    label: 'Manque d\'autonomie',
    description: 'Absence de latitude décisionnelle, micro-management',
    source: 'Karasek (1979)',
  },
  {
    code: 'FO7',
    category: 'Organisationnels',
    label: 'Changement organisationnel',
    description: 'Restructurations, crises, licenciements, modification des tâches',
    source: 'Baron & Neuman (1998)',
  },
  {
    code: 'FO8',
    category: 'Organisationnels',
    label: 'Injustice organisationnelle',
    description: 'Sentiment d\'injustice dans les décisions, promotions, sanctions',
    source: 'Desrumaux et al. (2004)',
  },
  {
    code: 'FO9',
    category: 'Organisationnels',
    label: 'Climat de travail délétère',
    description: 'Relations professionnelles dégradées, peur, méfiance, compétition toxique',
    source: 'Einarsen et al. (2013)',
  },
  {
    code: 'FO10',
    category: 'Organisationnels',
    label: 'Conditions physiques de travail',
    description: 'Exiguïté, bruit, températures inconfortables, environnement physique stressant',
    source: 'Hoel & Salin (2011)',
  },
  // Relationnels (FR1-FR6)
  {
    code: 'FR1',
    category: 'Relationnels',
    label: 'Déséquilibre des pouvoirs',
    description: 'Asymétrie de ressources entre les protagonistes, impossibilité de se défendre',
    source: 'Hirigoyen (2017)',
  },
  {
    code: 'FR2',
    category: 'Relationnels',
    label: 'Absence de soutien des collègues',
    description: 'Désolidarisation, silence des témoins, évitement, indifférence',
    source: 'Dejours (1998)',
  },
  {
    code: 'FR3',
    category: 'Relationnels',
    label: 'Absence de soutien hiérarchique',
    description: 'La hiérarchie ne réagit pas, soutient le harceleur, ou participe aux agissements',
    source: 'Faulx et al. (2007)',
  },
  {
    code: 'FR4',
    category: 'Relationnels',
    label: 'Soutien organisationnel au harceleur',
    description: 'L\'organisation soutient activement le harceleur',
    source: 'Faulx & Detroz (2009)',
  },
  {
    code: 'FR5',
    category: 'Relationnels',
    label: 'Dynamique de bouc émissaire',
    description: 'La cible sert d\'intégrateur négatif pour canaliser l\'agressivité du groupe',
    source: 'Girard, Faulx & Detroz (2009)',
  },
  {
    code: 'FR6',
    category: 'Relationnels',
    label: 'Emprise psychique',
    description: 'Séduction initiale puis domination, manipulation, perte du libre arbitre',
    source: 'Racamier (1980)',
  },
  // Individuels (FI1-FI5)
  {
    code: 'FI1',
    category: 'Individuels',
    label: 'Atypicité de la cible',
    description: 'Différence, personnalité qui dérange, non-conformisme',
    source: 'Hirigoyen (2014)',
  },
  {
    code: 'FI2',
    category: 'Individuels',
    label: 'Intégrité professionnelle',
    description: 'Forte implication, refus des irrégularités, dénonciation des mauvaises pratiques',
    source: 'Hirigoyen (2002)',
  },
  {
    code: 'FI3',
    category: 'Individuels',
    label: 'Statut protégé',
    description: 'Délégué syndical, femme enceinte, personne difficilement licenciable',
    source: 'Hirigoyen (2014)',
  },
  {
    code: 'FI4',
    category: 'Individuels',
    label: 'Fragilité temporaire',
    description: 'Divorce, maladie, événement de vie fragilisant',
    source: 'Hirigoyen (2014)',
  },
  {
    code: 'FI5',
    category: 'Individuels',
    label: 'Personnalité forte/opposante',
    description: 'Résistance au formatage, forte personnalité, "grande gueule"',
    source: 'Hirigoyen (1999)',
  },
];

// Données de test - 10 témoignages fictifs
export const MOCK_TESTIMONIES: Testimony[] = [
  {
    id: '1',
    firstName: 'Sophie',
    lastName: 'Martin',
    status: 'victime directe',
    type: 'AGISSEMENT DIRECT',
    dateAdded: new Date('2026-02-10'),
    eventDate: new Date('2024-09-15'),
    facts: [],
    factors: ['T1', 'T3', 'FO1', 'FR1', 'FR3'],
    content: `# Exclusion progressive et humiliations répétées

Depuis mon arrivée dans l'équipe il y a 18 mois, j'ai subi des **humiliations constantes** de la part de mon supérieur hiérarchique.

## Déroulement des faits

- **Septembre 2024** : Début des exclusions des réunions d'équipe importantes
- **Novembre 2024** : Propos dévalorisants devant mes collègues ("incompétente", "incapable")
- **Janvier 2025** : Isolation complète - bureau déplacé dans un local isolé

## Impact

Mon état de santé s'est gravement détérioré. Je souffre d'anxiété chronique et d'insomnies. J'ai dû consulter un médecin du travail qui m'a mise en arrêt.`,
  },
  {
    id: '2',
    firstName: 'Marc',
    lastName: 'Dubois',
    status: 'témoin',
    type: 'TEMOIN INDIRECT',
    dateAdded: new Date('2026-02-08'),
    eventDate: new Date('2024-11-20'),
    facts: [],
    factors: ['T2', 'T6', 'FO3', 'FO5', 'FR2'],
    content: `# Témoin des conditions de travail dégradées

J'ai observé que plusieurs collègues de mon service subissent des **conditions de travail intenables**.

## Ce que j'ai constaté

Ma collègue Claire reçoit quotidiennement des **consignes contradictoires** :
- Le matin : "Priorisez le dossier A"
- L'après-midi : "Pourquoi le dossier B n'est pas terminé ?"

Elle est également surchargée de tâches administratives sans rapport avec sa fiche de poste, tout en étant critiquée pour ne pas avoir accompli ses missions principales.

## Silence collectif

Personne dans l'équipe n'ose intervenir par peur de représailles.`,
  },
  {
    id: '3',
    firstName: 'Julie',
    lastName: 'Bernard',
    status: 'Victime et témoin',
    type: 'DIRECT ET STRUCTUREL',
    dateAdded: new Date('2026-02-05'),
    eventDate: new Date('2024-12-10'),
    facts: [],
    factors: ['T1', 'T5', 'T7', 'FO2', 'FO9', 'FR2', 'FR5', 'FI1'],
    content: `# Harcèlement moral et climat toxique

## Mon expérience personnelle

En tant que nouvelle arrivée dans l'équipe, j'ai rapidement été **mise à l'écart** :
- Interruptions systématiques lors des réunions
- Mes propositions ignorées ou ridiculisées
- Rumeurs malveillantes circulant sur mon compte

## Le climat général

L'ambiance dans le service est **délétère**. La direction ne réagit pas malgré plusieurs alertes. Les collègues ont peur et évitent de se solidariser.

J'ai l'impression d'être devenue le **bouc émissaire** de tous les dysfonctionnements.`,
  },
  {
    id: '4',
    firstName: 'Pierre',
    lastName: 'Leroy',
    status: 'victime directe',
    type: 'AGISSEMENT DIRECT',
    dateAdded: new Date('2026-01-28'),
    eventDate: new Date('2025-01-15'),
    facts: [],
    factors: ['T2', 'T4', 'FO1', 'FO6', 'FR1', 'FR4'],
    content: `# Menaces et privation de moyens de travail

Mon manager a instauré un **régime de terreur** au sein de l'équipe.

## Faits caractéristiques

- Menaces explicites : "Si tu ne fais pas ce que je dis, tu vas le regretter"
- Privation d'accès aux outils informatiques essentiels
- Impossibilité de prendre des décisions même mineures sans validation préalable
- Objectifs changeant quotidiennement

## Soutien hiérarchique inexistant

J'ai alerté la direction RH qui m'a répondu que "c'est son style de management" et qu'il fallait "faire avec".`,
  },
  {
    id: '5',
    firstName: 'Marie',
    lastName: 'Petit',
    status: 'témoin',
    type: 'CONTEXTE STRUCTUREL',
    dateAdded: new Date('2026-01-20'),
    eventDate: new Date('2024-09-01'),
    datePrecision: 'month', // Exemple: seulement mois connu
    facts: [],
    factors: ['FO4', 'FO5', 'FO7', 'FO8', 'FO10'],
    content: `# Désorganisation chronique du service

Depuis la **restructuration** de septembre dernier, le service est dans un chaos total.

## Problèmes organisationnels

- Rôles et responsabilités jamais clarifiés
- Surcharge de travail généralisée (12-14h/jour)
- Décisions injustes et arbitraires (promotions, primes)
- Locaux exigus et bruyants rendant le travail difficile

Plusieurs collègues sont en arrêt maladie. Le turnover est très élevé.`,
  },
  {
    id: '6',
    firstName: 'Thomas',
    lastName: 'Roux',
    status: 'victime directe',
    type: 'AGISSEMENT DIRECT',
    dateAdded: new Date('2026-01-15'),
    eventDate: new Date('2024-10-05'),
    facts: [],
    factors: ['T3', 'T9', 'T10', 'FR1', 'FI1'],
    content: `# Harcèlement sexuel et sexisme

En tant qu'homme dans un milieu majoritairement féminin, j'ai subi des **remarques sexistes** récurrentes de la part de ma responsable.

## Exemples de comportements

- Commentaires sur mon physique et ma tenue vestimentaire
- Sous-entendus à caractère sexuel
- Remarques du type "les hommes ne comprennent rien à ce métier"
- Contacts physiques non désirés (main sur l'épaule, bras)

Ces comportements créent un **environnement hostile** et je n'ose plus participer aux réunions d'équipe.`,
  },
  {
    id: '7',
    firstName: 'Céline',
    lastName: 'Moreau',
    status: 'Victime et témoin',
    type: 'DIRECT ET STRUCTUREL',
    dateAdded: new Date('2026-01-10'),
    eventDate: new Date('2024-01-01'),
    datePrecision: 'year', // Exemple: seulement année connue
    facts: [],
    factors: ['T2', 'T6', 'FO3', 'FR3', 'FR6', 'FI2', 'FI5'],
    content: `# Manipulation et emprise psychologique

## Début de la relation professionnelle

Au départ, mon manager était **charmant et valorisant**. Il me présentait comme "la perle rare" de l'équipe.

## Changement progressif

Puis progressivement :
- Consignes contradictoires devenant la norme
- Critiques constantes de mon travail, même excellent
- Alternance entre valorisation excessive et dévalorisation totale
- Contrôle de tous mes faits et gestes

## Perte de confiance

J'ai fini par **douter de mes propres compétences** et de ma perception de la réalité. Mon manager a réussi à me faire croire que tous les problèmes venaient de moi.

La hiérarchie ne m'a jamais soutenue, considérant que "c'était dans ma tête".`,
  },
  {
    id: '8',
    firstName: 'Nicolas',
    lastName: 'Simon',
    status: 'témoin',
    type: 'TEMOIN INDIRECT',
    dateAdded: new Date('2026-01-05'),
    eventDate: new Date('2024-11-01'),
    datePrecision: 'month', // Exemple: seulement mois connu
    facts: [],
    factors: ['T1', 'T7', 'FR2', 'FR5', 'FO9'],
    content: `# Mise au placard d'un collègue

J'ai assisté à la **mise au placard progressive** de mon collègue Laurent.

## Ce que j'ai observé

- Exclusion des réunions stratégiques
- Rumeurs malveillantes propagées par certains collègues
- Bureau déplacé dans un local éloigné et vétuste
- Aucune tâche valorisante ne lui est confiée

## Complicité collective

Le plus choquant est le **silence complice** de l'équipe. Personne n'intervient, tous ont peur d'être la prochaine cible.`,
  },
  {
    id: '9',
    firstName: 'Isabelle',
    lastName: 'Laurent',
    status: 'victime directe',
    type: 'AGISSEMENT DIRECT',
    dateAdded: new Date('2025-12-28'),
    eventDate: new Date('2025-03-12'),
    facts: [],
    factors: ['T4', 'T8', 'FO1', 'FR1', 'FI3', 'FI4'],
    content: `# Violence physique et intimidation

Suite à mon **annonce de grossesse**, mon manager a changé radicalement d'attitude.

## Escalade de la violence

- Menaces verbales quotidiennes
- Cris et insultes devant l'équipe
- Un jour, il a violemment claqué la porte à quelques centimètres de moi
- Menaces de "trouver un moyen de me faire partir"

## Fragilité accrue

Cette violence psychologique et ces intimidations alors que je suis enceinte ont des **conséquences graves** sur ma santé et celle de mon bébé.

Malgré mon statut de femme enceinte (normalement protégée), rien n'a été fait pour me protéger.`,
  },
  {
    id: '10',
    firstName: 'Antoine',
    lastName: 'Blanc',
    status: 'témoin',
    type: 'DÉCHARGE',
    dateAdded: new Date('2025-12-20'),
    eventDate: new Date('2025-02-01'),
    facts: [],
    factors: [],
    content: `# Témoignage positif

Je tiens à témoigner de mon expérience **positive** au sein de l'équipe.

## Mon ressenti

J'ai toujours été traité avec respect et professionnalisme. Mon manager est à l'écoute et me donne les moyens de réussir dans mes missions.

Les conditions de travail sont correctes et l'ambiance dans l'équipe est généralement bonne.

Je n'ai jamais été témoin de comportements inappropriés ou d'agissements problématiques.`,
  },
];
