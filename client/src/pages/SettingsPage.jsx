import { useState } from 'react'
import toast from 'react-hot-toast'

const warehouses = [
  { id: 'BLR-W01', status: 'Nominal', load: 78, color: 'bg-emerald-400', glow: 'shadow-[0_0_8px_rgba(52,211,153,0.5)]' },
  { id: 'DEL-N04', status: 'Nominal', load: 62, color: 'bg-emerald-400', glow: 'shadow-[0_0_8px_rgba(52,211,153,0.5)]' },
  { id: 'BOM-H02', status: 'Elevated', load: 89, color: 'bg-secondary-container', glow: 'shadow-[0_0_8px_rgba(241,197,1,0.5)]' },
  { id: 'MAA-E01', status: 'Critical', load: 98, color: 'bg-error animate-pulse', glow: 'shadow-[0_0_8px_rgba(255,180,171,0.5)]' },
]

function RangeSlider({ label, value, min, max, unit }) {
  const [val, setVal] = useState(value)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{label}</label>
        <span className="font-mono text-sm text-secondary-container">{val}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} value={val}
        onChange={e => setVal(e.target.value)}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #f1c501 0%, #f1c501 ${((val - min) / (max - min)) * 100}%, #32353d ${((val - min) / (max - min)) * 100}%, #32353d 100%)`
        }}
      />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 sm:p-6 pb-[90px] sm:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface">Administrative Settings</h1>
          <p className="text-xs sm:text-sm text-outline mt-1">Manage system parameters, access control, and operational thresholds.</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button onClick={() => toast.success('Audit logs exported')} className="btn-outline text-[11px] sm:text-sm flex-1 sm:flex-none h-10 sm:px-4">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">history</span> Audit Logs
          </button>
          <button onClick={() => toast.success('Settings saved successfully!')} className="btn-primary text-[11px] sm:text-sm flex-1 sm:flex-none h-10 sm:px-4">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">save</span> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Left: Thresholds + API Keys */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          {/* Thresholds */}
          <section className="glass-panel rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="material-symbols-outlined text-[80px]">tune</span>
            </div>
            <h2 className="text-lg font-semibold text-on-surface flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-brand">speed</span>
              Risk &amp; Operational Thresholds
            </h2>
            <div className="space-y-7">
              <RangeSlider label="Fleet Utilization Warning" value={85} min={0} max={100} unit="%" />
              <RangeSlider label="Automated Reroute Latency" value={120} min={50} max={500} unit="ms" />
              <RangeSlider label="Predictive Maintenance Confidence" value={92} min={70} max={99} unit="%" />
              <RangeSlider label="Delay Prediction Threshold" value={65} min={0} max={100} unit="%" />
            </div>
          </section>

          {/* API Credentials */}
          <section className="glass-panel rounded-xl p-6">
            <h2 className="text-lg font-semibold text-on-surface flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-brand">key</span>
              API Credentials
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Production Gateway Key', key: '••••••••••••••••••••••••••••xyz89', status: 'Active', statusColor: 'bg-primary-container/10 text-primary border-primary/20' },
                { name: 'Staging Telemetry Key', key: '••••••••••••••••••••••••••••abc12', status: 'Rotated', statusColor: 'bg-surface-variant text-on-surface-variant border-white/10' },
                { name: 'Google Maps API Key', key: '••••••••••••••••••••••••••••gmp34', status: 'Active', statusColor: 'bg-primary-container/10 text-primary border-primary/20' },
              ].map(k => (
                <div key={k.name} className="bg-[#080C16] border border-white/5 rounded-lg p-4 flex items-center justify-between group">
                  <div>
                    <p className="text-xs font-bold text-on-surface-variant mb-1">{k.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm text-on-surface">{k.key}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${k.statusColor}`}>{k.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {['visibility', 'content_copy'].map(icon => (
                      <button key={icon} onClick={() => toast.success(icon === 'content_copy' ? 'Copied!' : 'Key revealed')} className="p-2 rounded hover:bg-white/10 text-outline transition-colors">
                        <span className="material-symbols-outlined text-[18px]">{icon}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={() => toast.success('New API key generated')} className="w-full py-3 border border-dashed border-outline-variant/50 rounded-lg text-outline hover:text-white hover:border-white/30 hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm">
                <span className="material-symbols-outlined text-[18px]">add</span> Generate New Key
              </button>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="glass-panel rounded-xl p-6">
            <h2 className="text-lg font-semibold text-on-surface flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-brand">notifications</span>
              Notification Channels
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'SMS Alerts (Twilio)', icon: 'sms', enabled: true },
                { label: 'WhatsApp Business', icon: 'chat', enabled: true },
                { label: 'Email Reports', icon: 'email', enabled: false },
                { label: 'Push Notifications', icon: 'notifications_active', enabled: true },
              ].map(n => (
                <div key={n.label} className="bg-[#080C16] border border-white/5 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline text-[20px]">{n.icon}</span>
                    <span className="text-sm text-on-surface">{n.label}</span>
                  </div>
                  <div className={`w-10 h-5 rounded-full ${n.enabled ? 'bg-brand' : 'bg-surface-variant'} relative cursor-pointer transition-colors`}>
                    <div className={`absolute top-0.5 ${n.enabled ? 'right-0.5' : 'left-0.5'} w-4 h-4 rounded-full bg-white shadow transition-all`} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Warehouses */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <section className="glass-panel rounded-xl flex flex-col">
            <div className="p-5 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-base font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-brand text-[20px]">domain</span>
                Monitored Facilities
              </h2>
              <span className="px-2 py-1 rounded bg-surface-container-highest text-on-surface font-mono text-xs">4 Active</span>
            </div>
            <div className="p-3">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    {['Node ID', 'Status', 'Load'].map(h => (
                      <th key={h} className="pb-2 px-3 text-xs font-bold uppercase tracking-wider text-outline">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {warehouses.map(w => (
                    <tr key={w.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-mono text-sm text-on-surface">{w.id}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${w.color} ${w.glow}`} />
                          <span className={`text-sm ${w.status === 'Critical' ? 'text-error' : w.status === 'Elevated' ? 'text-secondary-container' : 'text-on-surface-variant'}`}>{w.status}</span>
                        </div>
                      </td>
                      <td className={`py-3 px-3 text-right font-mono text-sm ${w.load >= 95 ? 'text-error' : w.load >= 80 ? 'text-secondary-container' : 'text-outline'}`}>{w.load}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* System Status */}
          <section className="glass-panel rounded-xl p-5">
            <h2 className="text-base font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand text-[20px]">monitor_heart</span>
              System Health
            </h2>
            <div className="space-y-3">
              {[
                { label: 'API Gateway', status: 'Operational', pct: 99.8 },
                { label: 'ML Microservice', status: 'Operational', pct: 99.2 },
                { label: 'GPS Data Feed', status: 'Degraded', pct: 87.4 },
                { label: 'Alert Engine', status: 'Operational', pct: 100 },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-on-surface-variant">{s.label}</span>
                    <span className={`text-xs font-mono font-bold ${s.pct >= 99 ? 'text-emerald-400' : s.pct >= 90 ? 'text-secondary-container' : 'text-error'}`}>{s.pct}%</span>
                  </div>
                  <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.pct >= 99 ? '#4ade80' : s.pct >= 90 ? '#f1c501' : '#ffb4ab' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
