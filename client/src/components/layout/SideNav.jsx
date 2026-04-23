import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/fleet', icon: 'local_shipping', label: 'Fleet' },
  { to: '/routes', icon: 'route', label: 'Routes' },
  { to: '/risk', icon: 'warning', label: 'Risk', danger: true },
  { to: '/warehouse', icon: 'warehouse', label: 'Warehouse' },
  { to: '/analytics', icon: 'analytics', label: 'Analytics' },
  { to: '/settings', icon: 'settings', label: 'Settings' },
]

export default function SideNav() {
  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <nav className="hidden sm:flex fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex-col bg-[#080C16]/90 backdrop-blur-xl border-r border-white/10 shadow-2xl font-mono text-sm font-medium transition-all duration-300 w-20 lg:w-64">
        <div className="px-6 py-5 hidden lg:block">
          <div className="text-brand font-black text-lg font-sans">LogiSense AI</div>
          <div className="text-outline text-xs mt-0.5">Command Center</div>
        </div>

        <div className="flex flex-col gap-1 px-2 flex-1 mt-4 lg:mt-0">
          {links.map(({ to, icon, label, danger }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                isActive
                  ? 'bg-brand/10 text-brand lg:border-r-2 border-brand lg:shadow-[0_0_10px_rgba(24,119,242,0.3)] mx-1 lg:mx-0 rounded-lg lg:rounded-none lg:rounded-l-lg p-3 lg:px-4 flex items-center justify-center lg:justify-start gap-3 transition-all'
                  : `text-slate-500 hover:text-slate-200 hover:bg-white/5 mx-1 lg:mx-0 rounded-lg p-3 lg:px-4 flex items-center justify-center lg:justify-start gap-3 transition-all ${danger ? 'hover:text-error' : ''}`
              }
              title={label}
            >
              <span className={`material-symbols-outlined text-[24px] lg:text-[20px] ${danger ? 'text-inherit' : ''}`}>{icon}</span>
              <span className="hidden lg:block">{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="px-4 py-4 border-t border-white/5 hidden lg:block">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <span className="text-xs text-outline font-mono">System Nominal • v2.4.1</span>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation PWA */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full h-[64px] z-50 bg-[#080C16]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {links.slice(0, 5).map(({ to, icon, label, danger }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                isActive
                  ? 'flex flex-col items-center justify-center w-14 h-12 text-brand relative group'
                  : `flex flex-col items-center justify-center w-14 h-12 text-outline hover:text-slate-200 transition-colors ${danger ? 'hover:text-error' : ''}`
              }
            >
              <span className="material-symbols-outlined text-[24px]">{icon}</span>
              <span className="text-[10px] font-medium mt-0.5 truncate w-full text-center">{label}</span>
            </NavLink>
        ))}
      </nav>
    </>
  )
}

