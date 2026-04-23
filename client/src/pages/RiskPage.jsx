import { useDispatch, useSelector } from 'react-redux'
import { dismissAlert, resolveAlert } from '../store/alertsSlice'
import toast from 'react-hot-toast'

const severityConfig = {
  critical: { label: 'CRITICAL', border: 'border-l-error', icon_color: 'text-error', badge: 'bg-error/10 text-error border-error/20' },
  high:     { label: 'HIGH',     border: 'border-l-secondary-container', icon_color: 'text-secondary-container', badge: 'bg-secondary-container/10 text-secondary-container border-secondary-container/20' },
  medium:   { label: 'MEDIUM',   border: 'border-l-primary', icon_color: 'text-primary', badge: 'bg-primary/10 text-primary border-primary/20' },
}

export default function RiskPage() {
  const dispatch = useDispatch()
  const alerts = useSelector(s => s.alerts.list)
  const active = alerts.filter(a => !a.resolved)
  const resolved = alerts.filter(a => a.resolved)

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 sm:p-6 pb-[90px] sm:pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Risk Management</h1>
          <p className="text-xs sm:text-sm text-outline mt-1">AI-detected risk events and proactive alerts</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {['critical','high','medium'].map(s => {
            const c = severityConfig[s]
            const count = active.filter(a => a.severity === s).length
            return count > 0 ? (
              <div key={s} className={`glass-panel rounded-lg px-2.5 sm:px-3 py-1.5 flex items-center gap-2 border ${c.badge}`}>
                <span className="text-[10px] sm:text-xs font-bold">{count} {c.label}</span>
              </div>
            ) : null
          })}
        </div>
      </div>

      {/* Active Alerts */}
      {active.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-outline mb-3">Active Alerts ({active.length})</h2>
          <div className="space-y-3">
            {active.map(a => {
              const c = severityConfig[a.severity] || severityConfig.medium
              return (
                <div key={a.id} className={`glass-panel rounded-xl p-5 border-l-4 ${c.border} border border-white/5 group hover:bg-white/[0.02] transition-colors`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className={`material-symbols-outlined ${c.icon_color} mt-0.5 text-[22px]`}>{a.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-on-surface">{a.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${c.badge}`}>{c.label}</span>
                        </div>
                        <p className="font-mono text-xs text-outline">{a.shipmentId} • {a.route}</p>
                        <p className="text-sm text-on-surface-variant mt-2">{a.message}</p>
                        <p className="text-xs text-outline mt-1">{a.time}</p>
                      </div>
                    </div>
                    <button onClick={() => dispatch(dismissAlert(a.id))} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 text-outline">
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
                    <button onClick={() => { dispatch(resolveAlert(a.id)); toast.success('Alert resolved') }} className="btn-primary text-xs px-4 py-2">
                      {a.action1}
                    </button>
                    <button className="btn-outline text-xs px-4 py-2">{a.action2}</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Resolved */}
      {resolved.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-outline mb-3">Resolved ({resolved.length})</h2>
          <div className="space-y-2">
            {resolved.map(a => (
              <div key={a.id} className="glass-panel rounded-xl p-4 border border-white/5 opacity-50 flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
                <div>
                  <p className="text-sm text-on-surface-variant">{a.title}</p>
                  <p className="font-mono text-xs text-outline">{a.shipmentId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-outline">
          <span className="material-symbols-outlined text-6xl mb-4 text-emerald-400 opacity-60">shield</span>
          <h2 className="text-lg font-semibold text-on-surface mb-1">All Clear</h2>
          <p className="text-sm">No active risk alerts at this time.</p>
        </div>
      )}
    </div>
  )
}
