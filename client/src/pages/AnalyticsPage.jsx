import { useState } from 'react'
import toast from 'react-hot-toast'

const KPI = [
  { label: 'AVG DELAY', value: '42m', change: '+12%', icon: 'timer', color: 'text-error', bg: 'bg-error/5' },
  { label: 'COST SAVINGS', value: '₹1.2Cr', change: '+8%', icon: 'savings', color: 'text-primary', bg: 'bg-primary/5' },
  { label: 'ON-TIME DELIVERY', value: '94%', change: '-0%', icon: 'local_shipping', color: 'text-secondary-container', bg: 'bg-secondary-container/5' },
]

const delayCauses = [
  { label: 'Traffic Congestion', pct: 45, color: '#ff6b6b' },
  { label: 'Weather (Monsoon)', pct: 28, color: '#f59e0b' },
  { label: 'Vehicle Breakdown', pct: 15, color: '#f1c501' },
  { label: 'Documentation', pct: 12, color: '#4b8eff' },
]

const heatmapCities = [
  { name: 'DEL-NCR', x: '65%', y: '28%', intensity: 0.9, color: '#ff6b6b' },
  { name: 'BOM-MUM', x: '42%', y: '48%', intensity: 0.7, color: '#f59e0b' },
  { name: 'BLR-KAR', x: '48%', y: '68%', intensity: 0.4, color: '#4b8eff' },
  { name: 'CHN-MAS', x: '58%', y: '72%', intensity: 0.5, color: '#f59e0b' },
]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('month')

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 sm:p-6 pb-[90px] sm:pb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Operations Analytics</h1>
          <p className="text-xs sm:text-sm text-outline mt-1">Real-time performance metrics and delay analysis</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
          <div className="glass-panel rounded-lg p-1 flex gap-1 w-full sm:w-auto overflow-x-auto custom-scrollbar">
            {['week', 'month', 'quarter'].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${period === p ? 'bg-brand text-white' : 'text-outline hover:text-white'}`}>
                {p}
              </button>
            ))}
          </div>
          <button onClick={() => toast.success('Downloading report...')} className="btn-primary text-[11px] sm:text-sm w-full sm:w-auto h-9 sm:h-10">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">download</span> Download Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 pb-2 sm:pb-0 snap-x custom-scrollbar">
        {KPI.map(k => (
          <div key={k.label} className={`glass-panel min-w-[240px] sm:min-w-0 rounded-xl p-4 sm:p-5 ${k.bg} border border-white/5 snap-center`}>
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-outline">{k.label}</p>
              <span className={`material-symbols-outlined ${k.color} text-[20px] sm:text-[24px]`}>{k.icon}</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-on-surface">{k.value}</p>
            <p className={`text-[10px] sm:text-xs mt-1 font-mono ${k.change.startsWith('+') ? 'text-emerald-400' : 'text-error'}`}>
              {k.change} vs last {period}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Delay Causes Bar */}
        <div className="glass-panel rounded-xl p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-semibold text-on-surface mb-4">Delay Causes</h3>
          <div className="space-y-4">
            {delayCauses.map(d => (
              <div key={d.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs sm:text-sm text-on-surface-variant">{d.label}</span>
                  <span className="text-xs sm:text-sm font-mono font-bold" style={{ color: d.color }}>{d.pct}%</span>
                </div>
                <div className="w-full h-1.5 sm:h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${d.pct}%`, background: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delay Intensity Heatmap */}
        <div className="glass-panel rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm sm:text-base font-semibold text-on-surface">Delay Intensity Heatmap</h3>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-[10px] sm:text-xs text-outline">LOW</span>
              <div className="w-12 sm:w-20 h-1.5 sm:h-2 rounded-full" style={{ background: 'linear-gradient(to right, #4b8eff, #f59e0b, #ff6b6b)' }} />
              <span className="text-[10px] sm:text-xs text-outline">HIGH</span>
            </div>
          </div>
          {/* Mock India Map */}
          <div className="relative h-40 sm:h-48 bg-surface-container-low rounded-lg overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-outline text-[10px] sm:text-xs">India Route Network</p>
            </div>
            {heatmapCities.map(c => (
              <div key={c.name} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: c.x, top: c.y }}>
                <div className="relative flex flex-col items-center gap-1">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" style={{ background: c.color, boxShadow: `0 0 ${c.intensity * 20}px ${c.color}` }} />
                  <span className="text-[8px] sm:text-[9px] font-mono text-on-surface-variant bg-surface-container/80 px-1 rounded hidden sm:block">{c.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Shipments Table */}
      <div className="glass-panel rounded-xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm sm:text-base font-semibold text-on-surface">Recent Shipments</h3>
          <button className="text-[10px] sm:text-xs text-primary hover:text-white transition-colors h-8 px-2 flex items-center justify-center">View all →</button>
        </div>
        <div className="w-full overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full text-xs sm:text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5">
                {['Shipment ID', 'Route', 'Status', 'Risk', 'ETA', 'Driver'].map(h => (
                  <th key={h} className="text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-outline pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'LSI-8829-MUM', route: 'Delhi → Mumbai', status: 'delayed', risk: 75, eta: '14:30', driver: 'Ramesh Kumar' },
                { id: 'LSI-4410-BLR', route: 'Pune → Bangalore', status: 'in_transit', risk: 22, eta: '18:00', driver: 'Suresh Patel' },
                { id: 'LSI-7712-CHN', route: 'Surat → Chennai', status: 'in_transit', risk: 35, eta: '22:00', driver: 'Vijay Singh' },
                { id: 'LSI-3301-DEL', route: 'Mumbai → Delhi', status: 'delivered', risk: 0, eta: '—', driver: 'Mohan Das' },
              ].map(s => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 sm:py-3 pr-4 font-mono text-primary">{s.id}</td>
                  <td className="py-2.5 sm:py-3 pr-4 text-on-surface-variant whitespace-nowrap">{s.route}</td>
                  <td className="py-2.5 sm:py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${s.status === 'delayed' ? 'bg-secondary-container/20 text-secondary-container' : s.status === 'delivered' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-primary/20 text-primary'}`}>
                      {s.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-2.5 sm:py-3 pr-4">
                    <span className={`font-mono font-semibold ${s.risk >= 70 ? 'text-error' : s.risk >= 40 ? 'text-secondary-container' : 'text-emerald-400'}`}>{s.risk}%</span>
                  </td>
                  <td className="py-2.5 sm:py-3 pr-4 font-mono text-on-surface-variant">{s.eta}</td>
                  <td className="py-2.5 sm:py-3 text-on-surface-variant whitespace-nowrap">{s.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
