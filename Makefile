migrate:
	echo "npx prisma migrate dev"

db-start:
	docker run --name protonadc-db -e POSTGRES_USER=protonadc -e POSTGRES_PASSWORD=protonadc -e POSTGRES_DB=protonadc -p 5433:5432 -d postgres:16

db-remove:
	docker rm -f protonadc-db

format:
	npx prisma format

migrate:
	npx prisma migrate dev --name init
