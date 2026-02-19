import { NavLink, Form } from 'react-router'

type AppHeaderProps = {
  title: string
  projectName?: string | null
}

export default function AppHeader({ title, projectName }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm md:static">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Mobile : titre + déco, puis nav en dessous */}
        <div className="md:hidden">
          <div className="flex items-start justify-between pt-3 pb-1">
            <div>
              <h1 className="text-base font-bold text-gray-900">{title}</h1>
              {projectName && <p className="text-xs text-gray-500">{projectName}</p>}
            </div>
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
          <div className="flex items-center gap-2 pb-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="font-medium">Liste</span>
            </NavLink>
            <NavLink
              to="/chrono"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                }`
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Chrono</span>
            </NavLink>
          </div>
        </div>

        {/* Desktop : titre + déconnexion en haut, nav en dessous */}
        <div className="hidden md:flex pt-8 pb-2 items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{title}</h1>
            {projectName && <p className="text-gray-600 mt-2 text-lg">{projectName}</p>}
          </div>
          <Form method="post" action="/logout">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </button>
          </Form>
        </div>

        <div className="hidden md:flex pb-4 items-center gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Chronologie</span>
          </NavLink>
        </div>

      </div>
    </header>
  )
}
