const warehouses = [
  { id: 'BLR-W01', name: 'Bangalore West Hub', city: 'Bangalore', load: 78, queue: 12, status: 'Nominal', color: 'emerald' },
  { id: 'DEL-N04', name: 'Delhi North Facility', city: 'Delhi NCR', load: 62, queue: 8, status: 'Nominal', color: 'emerald' },
  { id: 'BOM-H02', name: 'Mumbai Harbor Terminal', city: 'Mumbai', load: 89, queue: 24, status: 'Elevated', color: 'yellow' },
  { id: 'MAA-E01', name: 'Chennai East Gateway', city: 'Chennai', load: 98, queue: 47, status: 'Critical', color: 'red' },
  { id: 'HYD-C03', name: 'Hyderabad Central Hub', city: 'Hyderabad', load: 55, queue: 6, status: 'Nominal', color: 'emerald' },
  { id: 'PNQ-W01', name: 'Pune West Distribution', city: 'Pune', load: 71, queue: 15, status: 'Nominal', color: 'emerald' },
]

const colors = {
  emerald: { dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]', text: 'text-emerald-400', bar: 'bg-emerald-400' },
  yellow:  { dot: 'bg-secondary-container shadow-[0_0_8px_rgba(241,197,1,0.5)]', text: 'text-secondary-container', bar: 'bg-secondary-container' },
  red:     { dot: 'bg-error animate-pulse shadow-[0_0_8px_rgba(255,180,171,0.5)]', text: 'text-error', bar: 'bg-error' },
}

export default function WarehousePage() {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 sm:p-6 pb-[90px] sm:pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Warehouse Network</h1>
          <p className="text-xs sm:text-sm text-outline mt-1">Real-time capacity and queue monitoring across all hubs</p>
        </div>
        <div className="flex gap-2">
          <div className="glass-panel rounded-lg px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono text-error">1 Critical</span>
          </div>
          <div className="glass-panel rounded-lg px-2.5 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary-container" />
            <span className="text-[10px] sm:text-xs font-mono text-secondary-container">1 Elevated</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {warehouses.map(w => {
          const c = colors[w.color]
          return (
            <div key={w.id} className="glass-panel rounded-xl p-5 border border-white/5 hover:border-brand/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <span className={`text-xs font-bold ${c.text}`}>{w.status}</span>
                  </div>
                  <p className="font-mono text-xs text-outline">{w.id}</p>
                  <p className="text-sm font-semibold text-on-surface mt-1">{w.name}</p>
                  <p className="text-xs text-outline">{w.city}</p>
                </div>
                <span className="material-symbols-outlined text-outline text-[28px]">warehouse</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-outline">Capacity Load</span>
                    <span className={`text-xs font-mono font-bold ${c.text}`}>{w.load}%</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${c.bar}`} style={{ width: `${w.load}%` }} />
                  </div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-outline">Queue Length</span>
                  <span className="font-mono text-on-surface">{w.queue} shipments</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
