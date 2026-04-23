import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeRouteModal } from '../../store/shipmentsSlice'
import toast from 'react-hot-toast'

const ROUTES = [
  {
    id: 'current',
    title: 'Current Route',
    subtitle: 'via NH-48 (Direct)',
    badge: 'HIGH RISK',
    badgeColor: 'bg-error/10 text-error border-error/20',
    eta: '42h 15m',
    risk: '87%',
    cost: '₹2,850',
    riskColor: 'text-error',
    etaColor: 'text-on-surface',
    costColor: 'text-on-surface',
    border: 'border-outline-variant/30',
    recommended: false,
  },
  {
    id: 'alt1',
    title: 'Alternative 1',
    subtitle: 'via Jaipur (NH-52)',
    badge: '★ RECOMMENDED',
    badgeColor: 'bg-secondary-container text-on-secondary',
    eta: '45h 30m',
    risk: '22%',
    cost: '₹3,100',
    riskColor: 'text-secondary',
    etaColor: 'text-secondary',
    costColor: 'text-secondary',
    note: 'Bypasses severe congestion zone. +3h transit time but significantly reduces delay probability.',
    border: 'border-secondary-container',
    recommended: true,
  },
  {
    id: 'modal',
    title: 'Modal Shift',
    subtitle: 'Truck to Rail (Rewari)',
    badge: 'INTERMODAL',
    badgeColor: 'bg-primary-container/20 text-primary border-primary/30',
    eta: '38h 00m',
    risk: '35%',
    cost: '₹3,450',
    riskColor: 'text-primary',
    etaColor: 'text-on-surface',
    costColor: 'text-on-surface',
    border: 'border-primary/30',
    recommended: false,
  },
]

export default function RouteModal() {
  const dispatch = useDispatch()
  const [selected, setSelected] = useState('alt1')

  const handleExecute = () => {
    const r = ROUTES.find(r => r.id === selected)
    toast.success(`Rerouting via ${r.subtitle}...`, { duration: 3000 })
    dispatch(closeRouteModal())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/70 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl bg-surface-container/90 backdrop-blur-xl rounded-xl border-t border-l border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-surface-container-high/50">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[28px]">route</span>
            <div>
              <h2 className="text-xl font-semibold text-on-surface">Route Optimisation</h2>
              <p className="text-sm text-on-surface-variant">TRK-8824 • Delhi to Mumbai</p>
            </div>
          </div>
          <button onClick={() => dispatch(closeRouteModal())} className="text-outline hover:text-on-surface transition-colors p-1 rounded-full hover:bg-white/5">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Map preview */}
          <div className="w-full h-40 rounded-lg mb-6 bg-surface-container-low border border-white/5 overflow-hidden relative flex items-center justify-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent" />
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(173,198,255,0.8)] z-10" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary-container rounded-full shadow-[0_0_10px_rgba(241,197,1,0.8)] z-10" />
            <svg className="absolute inset-0 w-full h-full opacity-50">
              <line x1="25%" y1="50%" x2="75%" y2="33%" stroke="#adc6ff" strokeDasharray="4 4" strokeWidth="2" />
            </svg>
            <div className="relative z-20 bg-surface-container/80 backdrop-blur-md px-4 py-2 rounded border border-white/10 flex items-center gap-2">
              <span className="material-symbols-outlined text-error text-[20px]">warning</span>
              <span className="text-sm text-on-surface">Severe congestion detected on NH-48</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-on-surface">Available Routes</h3>
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">3 Options Analysed</span>
          </div>

          {/* Route Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 mt-2">
            {ROUTES.map(route => (
              <div
                key={route.id}
                onClick={() => setSelected(route.id)}
                className={`relative rounded-lg border p-4 flex flex-col cursor-pointer transition-all ${route.recommended ? 'lg:scale-105 z-10 shadow-[0_0_20px_rgba(241,197,1,0.15)] ring-1 ring-secondary-container' : 'hover:bg-surface-container-low'} ${route.border} ${selected === route.id ? 'ring-2 ring-brand' : ''}`}
                style={{ background: route.recommended ? 'rgba(28,32,39,0.9)' : 'rgba(24,28,35,0.7)' }}
              >
                {route.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary-container text-on-secondary px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md whitespace-nowrap">
                    {route.badge}
                  </div>
                )}
                {!route.recommended && (
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${route.badgeColor}`}>{route.badge}</span>
                  </div>
                )}
                {route.recommended && (
                  <div className="absolute top-3 right-3 text-secondary-container">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                )}

                <h4 className={`font-semibold text-base mt-2 mb-0.5 ${route.id === 'modal' ? 'text-primary' : 'text-on-surface'}`}>{route.title}</h4>
                <p className="text-xs text-on-surface-variant/70 mb-4">{route.subtitle}</p>

                <div className="mt-auto space-y-2">
                  <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                    <span className="text-xs text-outline">ETA</span>
                    <span className={`text-xs font-mono font-semibold ${route.etaColor}`}>{route.eta}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                    <span className="text-xs text-outline">Risk Score</span>
                    <span className={`text-xs font-mono font-semibold ${route.riskColor}`}>{route.risk}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-outline">Est. Cost</span>
                    <span className={`text-xs font-mono font-semibold ${route.costColor}`}>{route.cost}</span>
                  </div>
                </div>

                {route.note && (
                  <div className="mt-3 bg-secondary-container/10 p-2.5 rounded border border-secondary-container/20">
                    <p className="text-xs text-secondary-container leading-relaxed">{route.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 bg-surface-container-lowest flex justify-end gap-3 items-center">
          <button onClick={() => dispatch(closeRouteModal())} className="text-sm font-medium text-on-surface px-5 py-2 rounded border border-white/20 hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button onClick={handleExecute} className="text-sm font-medium bg-primary text-on-primary px-5 py-2 rounded shadow-[0_0_15px_rgba(173,198,255,0.2)] hover:bg-white hover:text-[#002e69] transition-all flex items-center gap-2 active:scale-95">
            <span className="material-symbols-outlined text-[18px]">done_all</span>
            Execute Reroute
          </button>
        </div>
      </div>
    </div>
  )
}
