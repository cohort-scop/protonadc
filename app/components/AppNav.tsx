import { NavLink, Form } from 'react-router'

export default function AppNav() {
  return (
    <div className="flex items-center gap-3">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isActive ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`
        }
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <span className="font-medium">Vue liste</span>
      </NavLink>

      <NavLink
        to="/chrono"
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isActive ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`
        }
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium hidden sm:inline">Chronologie</span>
      </NavLink>

      <Form method="post" action="/logout">
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="hidden sm:inline">Déconnexion</span>
        </button>
      </Form>
    </div>
  )
}
