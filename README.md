# ProtonADC — Analyse de témoignages

Application d'analyse de témoignages de harcèlement moral au travail.

---

## Prérequis

- Node.js 20+
- Docker (pour la base de données en local)

## Configuration

Copier le template et remplir les valeurs :

```bash
cp .env.template .env
```

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL de connexion PostgreSQL |
| `SESSION_SECRET` | Clé secrète pour les cookies de session — générer avec `openssl rand -hex 32` |

**En local** : l'URL pointe vers le conteneur Docker (`localhost:5433`).

**En production (Neon via Vercel)** : Vercel injecte `DATABASE_URL` automatiquement, rien à faire.

> ⚠️ Ne jamais committer le fichier `.env` — il est dans `.gitignore`.

---

## Démarrage

### 1. Base de données

```bash
make db-start        # Démarre le conteneur PostgreSQL
npx prisma migrate deploy  # Applique les migrations
```

### 2. Développement

```bash
npm install
npm run dev          # Serveur dev sur http://localhost:5173
```

### 3. Production

```bash
npm run build
npm start
```

---

## Commandes Make

### Base de données

| Commande | Description |
|----------|-------------|
| `make db-start` | Démarre le conteneur PostgreSQL (Docker) |
| `make db-remove` | Supprime le conteneur PostgreSQL |
| `make db-reset` | Remet la DB à zéro (migrations + données) |
| `make migrate` | Crée et applique une migration Prisma |
| `make format` | Formate le schéma Prisma |

### Utilisateurs

| Commande | Description |
|----------|-------------|
| `make create-user username=<id> password=<mdp>` | Crée un nouvel utilisateur |
| `make update-password username=<id> password=<nouveau_mdp>` | Change le mot de passe d'un utilisateur |
| `make update-username username=<id> new_username=<nouvel_id>` | Change l'identifiant d'un utilisateur |
| `make reset-rate-limit` | Réinitialise le compteur de tentatives de connexion (débloque un IP bloqué) |

Exemples :

```bash
make create-user username=admin password=monmotdepasse
make update-password username=admin password=nouveaumotdepasse
make update-username username=admin new_username=alice
make reset-rate-limit
```

### Import de témoignages

| Commande | Description |
|----------|-------------|
| `make project name=<nom>` | Crée un projet en base, retourne son ID |
| `make import project_id=<id> json=<fichier.json> testimony=<fichier.md>` | Importe un témoignage qualifié |
| `make delete id=<RUJ-XXXXXXXXXX>` | Supprime un témoignage (cascade) |

Exemple complet :

```bash
make project name="CEA"
# → project created: id=1

make import project_id=1 json=temoignages/json_RUJ-XXXXXXXXXX.json testimony=temoignages/row_RUJ-XXXXXXXXXX.md
```

---

## Workflow d'import

Voir `CLAUDE.md` pour le workflow complet d'import assisté par IA (qualification → JSON → import).

---

## Routes

| URL | Description |
|-----|-------------|
| `/testi-mobile` | Vue liste (responsive mobile + desktop) |
| `/chrono-mobile` | Vue chronologie (responsive mobile + desktop) |
| `/login` | Page de connexion |
| `/logout` | Déconnexion |

---

## Architecture

```
app/
├── components/       # Composants réutilisables
│   ├── AppHeader.tsx     # Header responsive (mobile + desktop)
│   ├── FilterGroup.tsx   # Groupe de filtres (statut/type)
│   ├── InfoModal.tsx     # Modale d'information générique
│   ├── OverviewStats.tsx # Vue d'ensemble des facteurs
│   └── TestimonySidebar.tsx
├── import/           # Scripts CLI d'import
│   ├── cli.ts            # Import principal
│   ├── cli-create-user.ts
│   ├── cli-update-user.ts
│   ├── cli-create-project.ts
│   └── cli-delete.ts
├── lib/
│   ├── auth.server.ts    # Authentification + rate limiting
│   ├── prisma.ts
│   └── testimony.repository.ts
└── routes/
    ├── testi-mobile.tsx  # Vue liste responsive
    ├── chrono-mobile.tsx # Vue chronologie responsive
    ├── login.tsx
    └── logout.tsx
prisma/
└── schema.prisma
```
