import { redirect } from 'react-router'
import type { ActionFunctionArgs } from 'react-router'
import { getSession, destroySession } from '~/lib/auth.server'

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  throw redirect('/login', {
    headers: { 'Set-Cookie': await destroySession(session) },
  })
}
