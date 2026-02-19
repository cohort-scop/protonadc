db-start:
	docker run --name protonadc-db -e POSTGRES_USER=protonadc -e POSTGRES_PASSWORD=protonadc -e POSTGRES_DB=protonadc -p 5433:5432 -d postgres:16

db-remove:
	docker rm -f protonadc-db

format:
	npx prisma format

migrate:
	npx prisma migrate dev --name init

delete:
	set -a; . ./.env; set +a; npx tsx app/import/cli-delete.ts $(id)

db-reset:
	npx prisma migrate reset --force

project:
	set -a; . ./.env; set +a; npx tsx app/import/cli-create-project.ts $(name)

import:
	set -a; . ./.env; set +a; npx tsx app/import/cli.ts $(project_id) $(json) $(testimony)

create-user:
	set -a; . ./.env; set +a; npx tsx app/import/cli-create-user.ts $(username) $(password)

update-password:
	set -a; . ./.env; set +a; npx tsx app/import/cli-update-user.ts $(username) password $(password)

update-username:
	set -a; . ./.env; set +a; npx tsx app/import/cli-update-user.ts $(username) username $(new_username)

reset-rate-limit:
	set -a; . ./.env; set +a; npx tsx -e "import { prisma } from './app/lib/prisma.ts'; async function main() { const r = await prisma.loginAttempt.deleteMany(); console.log('Deleted:', r.count, 'records'); } main().finally(() => prisma.\$$disconnect());"
