import { NavLink, Form } from 'react-router'

export default function AppNavMobile() {
  return (
    <div className="flex items-center gap-2">
      <NavLink
        to="/testi-mobile"
        end
        className={({ isActive }) =>
          `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          }`
        }
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <span className="font-medium">Liste</span>
      </NavLink>

      <NavLink
        to="/chrono-mobile"
        className={({ isActive }) =>
          `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
          }`
        }
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">Chrono</span>
      </NavLink>

      <Form method="post" action="/logout">
        <button
          type="submit"
          className="flex items-center p-1.5 bg-gray-100 text-gray-700 rounded-lg"
          aria-label="Déconnexion"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </Form>
    </div>
  )
}
