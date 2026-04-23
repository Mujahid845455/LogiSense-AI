import { useDispatch, useSelector } from 'react-redux'
import { selectShipment } from '../store/shipmentsSlice'

const statusStyle = {
  delayed: 'bg-secondary-container/20 text-secondary-container border-secondary-container/30',
  in_transit: 'bg-primary/20 text-primary border-primary/30',
  delivered: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/30',
}

export default function FleetPage() {
  const dispatch = useDispatch()
  const shipments = useSelector(s => s.shipments.list)

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 sm:p-6 pb-[90px] sm:pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Fleet Management</h1>
          <p className="text-xs sm:text-sm text-outline mt-1">Monitor and manage all active vehicles</p>
        </div>
        <div className="flex gap-2">
          <div className="glass-panel rounded-lg px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono text-on-surface">3 Active</span>
          </div>
          <div className="glass-panel rounded-lg px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
            <span className="text-xs font-mono text-secondary-container">1 Delayed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {shipments.map(s => (
          <div
            key={s.id}
            onClick={() => dispatch(selectShipment(s.id))}
            className="glass-panel rounded-xl p-5 border border-white/5 hover:border-brand/30 cursor-pointer transition-all hover:bg-white/[0.02] group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-mono text-sm text-primary">{s.id}</p>
                <p className="text-xs text-outline mt-0.5">{s.vehicle} • {s.driver}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-bold border ${statusStyle[s.status] || statusStyle.in_transit}`}>
                {s.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-outline">trip_origin</span>
                <span className="truncate">{s.origin}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                <span className="truncate">{s.destination}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-outline">speed</span>
                <span className="text-xs font-mono text-on-surface-variant">{s.speed} km/h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${s.riskScore >= 70 ? 'bg-error' : s.riskScore >= 40 ? 'bg-secondary-container' : 'bg-emerald-400'}`} />
                <span className={`text-xs font-mono font-bold ${s.riskScore >= 70 ? 'text-error' : s.riskScore >= 40 ? 'text-secondary-container' : 'text-emerald-400'}`}>
                  Risk {s.riskScore}%
                </span>
              </div>
              <span className="text-xs font-mono text-outline">ETA {s.eta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
