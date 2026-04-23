import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer, openRouteModal } from '../../store/shipmentsSlice'
import { useEffect, useState } from 'react'
import { fetchWeatherByCity } from '../../services/weatherService'
import toast from 'react-hot-toast'

function RiskGauge({ score }) {
  const pct = Math.min(100, Math.max(0, score))
  const color = pct >= 70 ? '#ffb4ab' : pct >= 40 ? '#f1c501' : '#4ade80'
  return (
    <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#32353d" strokeWidth="3" />
        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={color} strokeDasharray={`${pct}, 100`} strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
        <span className="text-[8px] text-outline">RISK</span>
      </div>
    </div>
  )
}

const riskFactors = [
  { icon: 'rainy', label: 'Weather', value: 'Light Rain', color: 'text-outline', bg: 'bg-surface-container-low/30 border-white/5' },
  { icon: 'traffic', label: 'Traffic', value: 'Heavy Congestion', color: 'text-error', bg: 'bg-error-container/10 border-error/20' },
  { icon: 'warehouse', label: 'Warehouse', value: 'Cleared', color: 'text-outline', bg: 'bg-surface-container-low/30 border-white/5' },
  { icon: 'event', label: 'Events', value: 'VIP Movement', color: 'text-secondary', bg: 'bg-secondary-container/10 border-secondary/20' },
]

export default function ShipmentDrawer() {
  const dispatch = useDispatch()
  const { selected } = useSelector(s => s.shipments)
  const [localWeather, setLocalWeather] = useState(null)

  useEffect(() => {
    if (selected?.origin) {
      const city = selected.origin.split(' ')[0]
      fetchWeatherByCity(city).then(d => d && setLocalWeather(d))
    }
  }, [selected])

  if (!selected) return null

  const weatherData = localWeather ? {
    icon: 'cloud',
    label: 'Weather',
    value: `${Math.round(localWeather.main.temp)}°C, ${localWeather.weather[0].main}`,
    color: localWeather.weather[0].main.toLowerCase().includes('rain') ? 'text-blue-400' : 'text-outline',
    bg: localWeather.weather[0].main.toLowerCase().includes('rain') ? 'bg-blue-400/10 border-blue-400/20' : 'bg-surface-container-low/30 border-white/5'
  } : riskFactors[0]

  const displayFactors = [weatherData, ...riskFactors.slice(1)]

  const statusColor = selected.status === 'delayed' ? 'text-secondary-container' : selected.status === 'delivered' ? 'text-emerald-400' : 'text-primary'

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => dispatch(closeDrawer())} />

      {/* Drawer / Bottom Sheet */}
      <aside className="fixed inset-x-0 bottom-0 h-[85vh] rounded-t-2xl lg:inset-x-auto lg:inset-y-0 lg:right-0 lg:h-full lg:w-[400px] lg:rounded-none z-50 flex flex-col glass-panel lg:border-l border-t lg:border-t-0 border-white/10 shadow-2xl">
        {/* Header */}
        <header className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-surface-container-low/50">
          <div>
            <h2 className="text-xl font-semibold text-on-surface">Shipment Detail</h2>
            <p className="font-mono text-sm text-primary mt-0.5">{selected.id}</p>
          </div>
          <button onClick={() => dispatch(closeDrawer())} className="p-2 rounded-full hover:bg-white/10 transition-colors text-outline">
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">

          {/* Status & Risk */}
          <section className="glass-panel p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-2">Current Status</p>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${selected.status === 'delayed' ? 'bg-secondary-container animate-pulse' : 'bg-emerald-400'}`} />
                <span className={`text-sm font-medium ${statusColor} capitalize`}>
                  {selected.status === 'delayed' ? 'Delayed - High Traffic' : selected.status.replace('_', ' ')}
                </span>
              </div>
            </div>
            <RiskGauge score={selected.riskScore} />
          </section>

          {/* Live Tracking */}
          <section>
            <h3 className="text-sm font-semibold text-on-surface-variant mb-3">Live Tracking</h3>
            {/* Mini map */}
            <div className="glass-panel rounded-xl overflow-hidden h-28 relative flex items-center justify-center mb-4">
              <div className="absolute inset-0 bg-surface-container opacity-60" />
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              <div className="absolute w-3/4 h-px bg-primary/20 rotate-12" />
              <div className="absolute w-1/2 h-px bg-primary rotate-12 right-1/4 shadow-[0_0_10px_rgba(173,198,255,0.8)]" />
              <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] flex items-center justify-center">
                <span className="absolute w-7 h-7 bg-primary/30 rounded-full animate-ping" />
              </div>
            </div>
            {/* Timeline */}
            <div className="flex flex-col gap-4 pl-6 border-l-2 border-surface-variant ml-3">
              <div className="relative">
                <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-outline border-2 border-[#0A0F1F]" />
                <p className="text-sm text-on-surface">Origin: {selected.origin}</p>
                <p className="text-xs text-outline mt-0.5">10:00 AM, Today</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-[#0A0F1F] shadow-[0_0_8px_rgba(173,198,255,0.6)]" />
                <p className="text-sm text-primary">Current: {selected.currentLocation}</p>
                <p className="text-xs text-primary/70 mt-0.5">Moving at {selected.speed} km/h</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-surface-variant border-2 border-[#0A0F1F]" />
                <p className="text-sm text-on-surface-variant">Destination: {selected.destination}</p>
                <p className="text-xs text-outline mt-0.5">Est. Arrival: {selected.eta}</p>
              </div>
            </div>
          </section>

          {/* Risk Factors */}
          <section>
            <h3 className="text-sm font-semibold text-on-surface-variant mb-3">Risk Factors</h3>
            <div className="grid grid-cols-2 gap-2">
              {displayFactors.map(f => (
                <div key={f.label} className={`glass-panel p-3 rounded-lg flex items-start gap-2.5 border ${f.bg}`}>
                  <span className={`material-symbols-outlined ${f.color} text-[20px] mt-0.5`}>{f.icon}</span>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${f.color}`}>{f.label}</p>
                    <p className="text-xs text-on-surface">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cargo Info */}
          <section className="glass-panel rounded-xl p-4">
            <h3 className="text-sm font-semibold text-on-surface-variant mb-3">Cargo Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-outline">Cargo Type</p><p className="text-on-surface mt-0.5">{selected.cargo}</p></div>
              <div><p className="text-xs text-outline">Vehicle</p><p className="text-on-surface font-mono mt-0.5">{selected.vehicle}</p></div>
              <div><p className="text-xs text-outline">Driver</p><p className="text-on-surface mt-0.5">{selected.driver}</p></div>
              <div><p className="text-xs text-outline">ETA</p><p className="text-on-surface mt-0.5">{selected.eta}</p></div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <footer className="p-5 border-t border-white/5 bg-surface-container-highest/80 backdrop-blur-md space-y-2">
          <button
            onClick={() => { dispatch(openRouteModal()); }}
            className="w-full bg-primary text-on-primary font-semibold py-3 px-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.2)] active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">route</span>
            Optimise Route
          </button>
          <div className="flex gap-2">
            <button onClick={() => toast.success('Connecting to driver...')} className="flex-1 border border-white/20 text-primary text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">call</span> Call Driver
            </button>
            <button onClick={() => toast.success('Alert acknowledged')} className="flex-1 bg-error-container/20 border border-error/30 text-error text-sm py-2 px-3 rounded-lg hover:bg-error-container/40 transition-colors flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">warning</span> Acknowledge
            </button>
          </div>
        </footer>
      </aside>
    </>
  )
}
