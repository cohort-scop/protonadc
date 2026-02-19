import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'

async function main() {
  const [currentUsername, field, value] = process.argv.slice(2)

  if (!currentUsername || !field || !value) {
    console.error('Usage:')
    console.error('  Change password : npx tsx app/import/cli-update-user.ts <username> password <new_password>')
    console.error('  Change username : npx tsx app/import/cli-update-user.ts <username> username <new_username>')
    process.exit(1)
  }

  const user = await prisma.user.findUnique({ where: { username: currentUsername } })
  if (!user) {
    console.error(`User "${currentUsername}" not found`)
    process.exit(1)
  }

  if (field === 'password') {
    const passwordHash = await bcrypt.hash(value, 12)
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash } })
    console.log(`Password updated for "${currentUsername}"`)
  } else if (field === 'username') {
    await prisma.user.update({ where: { id: user.id }, data: { username: value } })
    console.log(`Username changed: "${currentUsername}" → "${value}"`)
  } else {
    console.error(`Unknown field "${field}". Use "password" or "username"`)
    process.exit(1)
  }
}

main().finally(() => prisma.$disconnect())
