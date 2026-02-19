import { redirect } from 'react-router'
import bcrypt from 'bcryptjs'
import { getSession, commitSession, destroySession } from './session.server'
import { prisma } from './prisma'

export { commitSession, destroySession, getSession }

const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 5

export async function requireAuth(request: Request): Promise<void> {
  const session = await getSession(request.headers.get('Cookie'))
  if (!session.get('userId')) {
    throw redirect('/login')
  }
}

// Retourne un message d'erreur si rate-limited, null sinon
export async function checkRateLimit(ip: string): Promise<string | null> {
  const now = new Date()
  const windowStart = new Date(now.getTime() - WINDOW_MS)

  const record = await prisma.loginAttempt.findUnique({ where: { ip } })

  if (!record || record.windowStart < windowStart) {
    await prisma.loginAttempt.upsert({
      where: { ip },
      create: { ip, attempts: 1, windowStart: now },
      update: { attempts: 1, windowStart: now },
    })
    return null
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    const minutesLeft = Math.ceil((record.windowStart.getTime() + WINDOW_MS - now.getTime()) / 60000)
    return `Trop de tentatives. Réessayez dans ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`
  }

  await prisma.loginAttempt.update({
    where: { ip },
    data: { attempts: { increment: 1 } },
  })
  return null
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return false
  return bcrypt.compare(password, user.passwordHash)
}
