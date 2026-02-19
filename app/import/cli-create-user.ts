import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'

async function main() {
  const [username, password] = process.argv.slice(2)
  if (!username || !password) {
    console.error('Usage: npx tsx app/import/cli-create-user.ts <username> <password>')
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { username, passwordHash },
  })

  console.log(`User created: id=${user.id} username=${user.username}`)
}

main().finally(() => prisma.$disconnect())
