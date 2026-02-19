# Workflow d'import de témoignages

## Contexte

Ce projet analyse des témoignages de harcèlement moral au travail recueillis lors d'enquêtes.
Les témoignages bruts (format `.md`) sont qualifiés via une méthodologie experte puis importés en base PostgreSQL.

## Prérequis

La base de données doit être démarrée :
```bash
make db-start
```

## Déclencheur

Quand l'utilisateur envoie un chemin de fichier de témoignage (ex: `temoignages/row_RUJ-XXXXXXXXXX.md`), exécuter automatiquement le workflow complet ci-dessous sans demander de confirmation.

Le projet doit exister au préalable. Demander le `project_id` s'il n'est pas fourni.

## Workflow complet

### 1. Lire le fichier todo

Le fichier todo liste les témoignages à traiter :
```
- [ ] temoignages/row_RUJ-XXXXXXXXXX.md
- [ ] temoignages/row_RUJ-YYYYYYYYYY.md
```

### 2. Pour chaque témoignage non traité (`- [ ]`)

**a) Lire le fichier de témoignage**

**b) Appliquer la méthodologie `qualification.md`**

Lire `qualification.md` en entier et produire le JSON de qualification selon le format de la section 5.
Points clés :
- `id` : extraire depuis le nom du fichier (`row_RUJ-XXXXXXXXXX.md` → `RUJ-XXXXXXXXXX`)
- Les codes facteurs viennent exclusivement du référentiel (`qualification.md` section 2)
- `qualification: null` uniquement pour les témoignages `DECHARGE`

**c) Écrire le JSON dans un fichier colocalisé**

Même dossier que le témoignage, même id, préfixe `json_` :
```
temoignages/row_RUJ-XXXXXXXXXX.md   ← source
temoignages/json_RUJ-XXXXXXXXXX.json ← JSON généré
```

**d) Lancer l'import**

Le `project_id` est l'id du projet existant (ex: `1` pour CEA) :
```bash
set -a; . ./.env; set +a; npx tsx app/import/cli.ts <project_id> temoignages/json_RUJ-XXXXXXXXXX.json temoignages/row_RUJ-XXXXXXXXXX.md
```

**e) Marquer comme traité si succès**

Changer `- [ ]` en `- [x]` dans le fichier todo.

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `qualification.md` | Méthodologie d'analyse et référentiel des codes (T1–T10, FO1–FO10, FR1–FR6, FI1–FI5, CS1–CS7) |
| `app/constants/factors.ts` | Record TypeScript des codes → libellés (source de vérité côté code) |
| `app/import/schema.ts` | Schéma Zod — valide le JSON avant import |
| `app/lib/project.ts` | `createProject(name)` — crée un projet en DB |
| `app/import/import.ts` | `importTestimony(projectId, jsonPath, testimonyPath)` — transaction Prisma |
| `app/import/cli.ts` | Import complet : crée le projet puis importe le témoignage |
| `app/import/cli-create-project.ts` | Crée un projet seul, retourne l'id en stdout |
| `app/import/cli-delete.ts` | Supprime un témoignage par id (cascade) |

## En cas d'erreur d'import

- **Erreur Zod** : le JSON ne respecte pas le schéma → corriger le JSON généré
- **Erreur Prisma** : problème DB (connexion, doublon) → vérifier `make db-start` et que l'id n'existe pas déjà
