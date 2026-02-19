import { redirect, data } from 'react-router'
import { Form, useActionData } from 'react-router'
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router'
import { getSession, commitSession, checkRateLimit, verifyCredentials } from '~/lib/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  if (session.get('userId')) {
    throw redirect('/')
  }
  return null
}

export async function action({ request }: ActionFunctionArgs) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1'

  const rateLimitError = await checkRateLimit(ip)
  if (rateLimitError) {
    return data({ error: rateLimitError }, { status: 429 })
  }

  const formData = await request.formData()
  const username = String(formData.get('username') ?? '')
  const password = String(formData.get('password') ?? '')

  const valid = await verifyCredentials(username, password)
  if (!valid) {
    return data({ error: 'Identifiants incorrects' }, { status: 401 })
  }

  const session = await getSession(request.headers.get('Cookie'))
  session.set('userId', username)

  throw redirect('/', {
    headers: { 'Set-Cookie': await commitSession(session) },
  })
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">Connexion</h1>

        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Identifiant
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {actionData?.error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {actionData.error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Se connecter
          </button>
        </Form>
      </div>
    </div>
  )
}
