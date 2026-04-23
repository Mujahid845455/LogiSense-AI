import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { openRouteModal } from '../store/shipmentsSlice'

const routes = [
  { id: 'RT-001', from: 'Delhi NCR', to: 'Mumbai Port', distance: '1,420 km', vehicles: 2, status: 'active', risk: 75, eta: '42h 15m', highway: 'NH-48' },
  { id: 'RT-002', from: 'Pune Hub', to: 'Bangalore WH', distance: '840 km', vehicles: 1, status: 'active', risk: 22, eta: '18h 00m', highway: 'NH-48 South' },
  { id: 'RT-003', from: 'Surat Factory', to: 'Chennai Port', distance: '1,180 km', vehicles: 1, status: 'active', risk: 35, eta: '22h 00m', highway: 'NH-44' },
  { id: 'RT-004', from: 'Kolkata Hub', to: 'Delhi NCR', distance: '1,530 km', vehicles: 0, status: 'planned', risk: 0, eta: '—', highway: 'NH-19' },
]

export default function RoutesPage() {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? routes : routes.filter(r => r.status === filter)

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 sm:p-6 pb-[90px] sm:pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Route Management</h1>
          <p className="text-xs sm:text-sm text-outline mt-1">Active and planned logistics routes across India</p>
        </div>
        <div className="glass-panel rounded-lg p-1 flex gap-1 w-full sm:w-auto overflow-x-auto">
          {['all', 'active', 'planned'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-1 sm:px-4 py-1.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-brand text-white' : 'text-outline hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 sm:space-y-3">
        {filtered.map(r => (
          <div key={r.id} className="glass-panel rounded-xl p-4 sm:p-5 border border-white/5 hover:border-brand/20 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex-1">
                  <p className="font-mono text-[10px] sm:text-xs text-outline mb-1">{r.id} • {r.highway}</p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-sm sm:text-base font-semibold text-on-surface">{r.from}</span>
                    <span className="material-symbols-outlined text-outline text-[18px] sm:text-[20px]">arrow_forward</span>
                    <span className="text-sm sm:text-base font-semibold text-on-surface">{r.to}</span>
                  </div>
                  <p className="text-xs text-outline mt-1">{r.distance} • {r.vehicles} vehicle{r.vehicles !== 1 ? 's' : ''}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 sm:gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                <div className="text-left md:text-center">
                  <p className="text-[10px] sm:text-xs text-outline mb-0.5 sm:mb-1">ETA</p>
                  <p className="font-mono text-xs sm:text-sm text-on-surface">{r.eta}</p>
                </div>
                <div className="text-left md:text-center">
                  <p className="text-[10px] sm:text-xs text-outline mb-0.5 sm:mb-1">Risk</p>
                  <p className={`font-mono text-xs sm:text-sm font-bold ${r.risk >= 70 ? 'text-error' : r.risk >= 40 ? 'text-secondary-container' : r.risk === 0 ? 'text-outline' : 'text-emerald-400'}`}>
                    {r.risk > 0 ? `${r.risk}%` : '—'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border ${r.status === 'active' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-outline/10 text-outline border-outline/20'}`}>
                    {r.status}
                  </span>
                  {r.risk >= 60 && (
                    <button onClick={() => dispatch(openRouteModal())} className="btn-primary text-[10px] sm:text-xs px-3 py-2 h-8 sm:h-9">
                      <span className="material-symbols-outlined text-[16px]">route</span> Optimise
                    </button>
                  )}
                </div>
              </div>
            </div>
            {r.risk >= 70 && (
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[16px]">warning</span>
                <p className="text-xs text-error">High congestion detected on {r.highway}. Reroute recommended.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
