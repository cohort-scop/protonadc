import { describe, it, expect, vi } from 'vitest'
import { readFile } from 'fs/promises'
import { importTestimony } from './import'

vi.mock('fs/promises', () => ({
  readFile: vi.fn(),
}))

const mockTx = {
  person: { create: vi.fn().mockResolvedValue({ id: 1 }) },
  testimony: { create: vi.fn().mockResolvedValue({ id: 1, status: 'Victime directe', type: 'AGISSEMENT DIRECT', content: '' }) },
  factor: { createMany: vi.fn().mockResolvedValue({ count: 12 }) },
  event: { createMany: vi.fn().mockResolvedValue({ count: 6 }) },
}

vi.mock('../lib/prisma', () => ({
  prisma: {
    $transaction: vi.fn((fn: (tx: typeof mockTx) => Promise<unknown>) => fn(mockTx)),
  },
}))

const json = `
{
  "id": "RUJ-UTWHCDIUJR",
    "first_name": null,
      "last_name": null,
        "anonymous": true,
          "statut": "Victime directe",
            "type": "AGISSEMENT DIRECT",

              "facts": [
                "Surcharge de travail non traitee malgre alertes repetees (charge pour 2 personnes)",
                "Injonction repetee a quitter le CEA",
                "Silence total et ostracisme pendant 2 semaines apres courriel d'alerte",
                "Propos deshumanisants sur un collegue evince, satisfaction exprimee publiquement de s'en etre separe",
                "Questions intrusives sur vie privee sous fausse bienveillance, sous-entendu de divorce",
                "Engueulade disproportionnee de 10 minutes pour un courriel de support informatique, menace voilee",
                "Pressions excessives sur un projet lie a un ami du manager",
                "Accident de travail en 2025 medicalement attribue au stress chronique"
              ],

                "events": [
                  {
                    "id": "EVT-UTWHCDIUJR-1",
                    "begin_at": "2022-01",
                    "end_at": "2022-09",
                    "title": "Surcharge de travail, refus d'aide et injonction a quitter le CEA",
                    "description": "L'ingenieur alerte Gaillard sur sa surcharge (charge pour 2 personnes). Gaillard minimise, promet une embauche qui n'arrive que 9 mois plus tard. Il dit d'arreter de se plaindre et repete a plusieurs reprises de quitter le CEA. L'ingenieur eclate en sanglots dans un couloir.",
                    "verbatims": [
                      "Si tu n'es pas content, tu n'as qu'a quitter le CEA !",
                      "d'autres personnes avaient autant de travail que moi et qu'elles ne se plaignaient pas",
                      "le mauvais management de Mr F.Gaillard est connu depuis plusieurs annees"
                    ],
                    "linked_to": "EVT-UTWHCDIUJR-2"
                  },
                  {
                    "id": "EVT-UTWHCDIUJR-2",
                    "begin_at": "2022",
                    "end_at": "2022",
                    "title": "Silence total et ostracisme apres courriel d'alerte",
                    "description": "L'ingenieur envoie un courriel a Gaillard et au chef de service signalant l'impact du conflit sur son travail. Aucune reponse. Gaillard ne lui adresse plus la parole pendant 2 semaines, meme plus un bonjour.",
                    "verbatims": [
                      "je n'ai eu aucune reponse, ni par courriel ni oralement de leur part",
                      "la seule reponse que j'ai eue, c'est Mr F.Gaillard qui ne m'a plus adresse la parole pendant 2 semaines"
                    ],
                    "linked_to": null
                  },
                  {
                    "id": "EVT-UTWHCDIUJR-3",
                    "begin_at": "2023-01",
                    "end_at": "2023-01",
                    "title": "Propos deshumanisants envers un collegue evince",
                    "description": "Apres qu'un collegue ait ete change de service suite a un conflit avec Gaillard, ce dernier declare lors d'un entretien etre 'heureux de s'etre debarrasse' de cette personne.",
                    "verbatims": [
                      "Je suis heureux de m'etre debarrasse de Mr X."
                    ],
                    "linked_to": null
                  },
                  {
                    "id": "EVT-UTWHCDIUJR-4",
                    "begin_at": "2023",
                    "end_at": "2023",
                    "title": "Pressions sur la vie privee sous fausse bienveillance",
                    "description": "Gaillard convoque l'ingenieur a deux reprises. A chaque fois il aborde sa situation familiale (famille eloignee) et suggere de chercher un poste ailleurs, avec sous-entendu de risque de divorce. L'ingenieur comprend retrospectivement une strategie de debarrasser sous couvert de bienveillance.",
                    "verbatims": [
                      "Ne penses-tu pas a chercher un poste la-bas ?",
                      "l'eloignement pourrait peut-etre un jour poser un probleme",
                      "sous une fausse attitude de bienveillance, il distille une forme de doute, d'instabilite, dans le but de se debarrasser de tel ou tel probleme"
                    ],
                    "linked_to": null
                  },
                  {
                    "id": "EVT-UTWHCDIUJR-5",
                    "begin_at": "2024",
                    "end_at": "2024",
                    "title": "Engueulade disproportionnee pour un courriel anodin",
                    "description": "L'ingenieur ecrit 'grosse daube' dans un courriel de support. Gaillard le convoque immediatement et lui inflige 10 minutes d'engueulade sans lui laisser la parole, terminant par une menace voilee. L'ingenieur apprend ensuite que Gaillard a deverse sa colere personnelle envers un autre chef de service sur lui.",
                    "verbatims": [
                      "10 minutes d'une grosse engueulade, ou Mr F.Gaillard m'a reellement fait peur physiquement et psychologiquement",
                      "je n'aurais droit a aucune parole, exactement comme un petit garcon de 5 ans qui se fait gronder",
                      "Je ne sais meme pas ou cela peut aller ?!?!"
                    ],
                    "linked_to": null
                  },
                  {
                    "id": "EVT-UTWHCDIUJR-6",
                    "begin_at": "2025",
                    "end_at": "2025",
                    "title": "Accident de travail lie au surmenage chronique",
                    "description": "L'ingenieur a un accident de travail. Les medecins (medecine du travail et medecin traitant) attribuent l'accident au surmenage et stress chronique lies au management de Gaillard. Symptomes : vertiges et crampes musculaires pendant plusieurs mois. Disparition quasi-totale 3 jours apres l'annonce de la suspension de Gaillard le 17/12/2025.",
                    "verbatims": [
                      "les medecins m'ont fait comprendre que cet accident etait la consequence directe d'un surmenage, d'un stress chronique, lie a mon travail et ma hierarchie en la personne de Mr F.Gaillard",
                      "3 jours apres l'annonce de cette suspension, mes sequelles ont quasi disparu totalement",
                      "j'avais comme une epee de Damocles au-dessus de ma tete, en la personne de Mr F.Gaillard"
                    ],
                    "linked_to": "EVT-UTWHCDIUJR-1"
                  }
                ],

                  "factors": [
                    {
                      "code": "T1",
                      "name": "Isolement et refus de communication",
                      "verbatim": "la seule reponse que j'ai eue, c'est Mr F.Gaillard qui ne m'a plus adresse la parole pendant 2 semaines"
                    },
                    {
                      "code": "T2",
                      "name": "Atteinte aux conditions de travail",
                      "verbatim": "j'avais une charge de travail pour 2 personnes et non 1 seule"
                    },
                    {
                      "code": "T3",
                      "name": "Attaques personnelles",
                      "verbatim": "Je suis heureux de m'etre debarrasse de Mr X."
                    },
                    {
                      "code": "T4",
                      "name": "Intimidations",
                      "verbatim": "10 minutes d'une grosse engueulade, ou Mr F.Gaillard m'a reellement fait peur physiquement et psychologiquement"
                    },
                    {
                      "code": "FO1",
                      "name": "Management autoritaire",
                      "verbatim": "il ne m'a meme pas demande de raconter ma version de l'histoire"
                    },
                    {
                      "code": "FO5",
                      "name": "Surcharge de travail",
                      "verbatim": "j'avais une charge de travail pour 2 personnes et non 1 seule"
                    },
                    {
                      "code": "FR1",
                      "name": "Desequilibre des pouvoirs",
                      "verbatim": "Mr F.Gaillard nous fait reellement peur, nous, victimes de son management virulent"
                    },
                    {
                      "code": "FR3",
                      "name": "Absence de soutien hierarchique",
                      "verbatim": "je n'ai eu aucune reponse, ni par courriel ni oralement de leur part"
                    },
                    {
                      "code": "FR6",
                      "name": "Emprise psychique",
                      "verbatim": "sous une fausse attitude de bienveillance, il distille une forme de doute, d'instabilite, dans le but de se debarrasser de tel ou tel probleme"
                    },
                    {
                      "code": "CS4",
                      "name": "Anxiete",
                      "verbatim": "j'avais comme une epee de Damocles au-dessus de ma tete, en la personne de Mr F.Gaillard"
                    },
                    {
                      "code": "CS5",
                      "name": "Symptomes physiques",
                      "verbatim": "j'ai souffert pendant plusieurs mois de symptomes (vertiges, crampes musculaires)"
                    },
                    {
                      "code": "CS6",
                      "name": "Impact professionnel",
                      "verbatim": "j'ai donc ete arrete pendant plusieurs mois"
                    }
                  ],

                    "qualification": {
    "C1_repetition": true,
      "C2_impact_negatif": true,
        "C3_desequilibre_pouvoirs": true,
          "C4_absence_dialogue": true
  }
}
`

describe('importTestimony', () => {
  it('importe un témoignage avec succès', async () => {
    vi.mocked(readFile)
      .mockResolvedValueOnce(json as never)           // 1er appel : json_RUJ-*.json
      .mockResolvedValueOnce('contenu brut' as never) // 2ème appel : row_RUJ-*.md

    const result = await importTestimony(1, '/fake/json_RUJ-X.json', '/fake/row_RUJ-X.md')
    expect(result.success).toBe(true)
  })

  it('retourne une erreur si le JSON est invalide', async () => {
    vi.mocked(readFile)
      .mockResolvedValueOnce('{"id": "champs-manquants"}' as never)
      .mockResolvedValueOnce('contenu brut' as never)

    const result = await importTestimony(1, '/fake/json_RUJ-X.json', '/fake/row_RUJ-X.md')
    expect(result.success).toBe(false)
  })
})
