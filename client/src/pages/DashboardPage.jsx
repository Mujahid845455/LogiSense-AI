import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { selectShipment } from '../store/shipmentsSlice'
import { dismissAlert } from '../store/alertsSlice'
import ShipmentDrawer from '../components/shipments/ShipmentDrawer'
import RouteModal from '../components/routes/RouteModal'
import { openRouteModal } from '../store/shipmentsSlice'
import toast from 'react-hot-toast'
import MapplsMap from '../components/map/MapplsMap'

const VEHICLES = [
  { id: 'LSI-8829-MUM', lat: 28.6139, lng: 77.2090, status: 'delayed', label: 'ID-892A', vehicle: 'TRK-892A' },
  { id: 'LSI-4410-BLR', lat: 19.0760, lng: 72.8777, status: 'ok', vehicle: 'TRK-110C' },
  { id: 'LSI-2200-HYD', lat: 12.9716, lng: 77.5946, status: 'ok', vehicle: 'C-44B' },
]

export default function DashboardPage() {
  const dispatch = useDispatch()
  const allAlerts = useSelector(s => s.alerts.list)
  const alerts = allAlerts.filter(a => !a.resolved)
  const { showDrawer, showRouteModal } = useSelector(s => s.shipments)
  const criticalCount = alerts.filter(a => a.severity === 'critical').length
  const [mobileAlertsOpen, setMobileAlertsOpen] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row h-full relative overflow-hidden">
      {/* Map Area */}
      <div className="flex-1 lg:w-[70%] relative bg-[#050810] overflow-hidden">
        <MapplsMap 
          center={[20.5937, 78.9629]} 
          zoom={5} 
          vehicles={VEHICLES}
          onVehicleClick={(id) => dispatch(selectShipment(id))}
        />

        {/* Map Controls */}
        <div className="absolute bottom-6 right-4 sm:right-6 flex flex-col gap-2 z-30">
          <button 
            className="lg:hidden w-12 h-12 rounded-full glass-panel bg-brand/20 flex items-center justify-center text-brand relative mb-2 shadow-lg"
            onClick={() => setMobileAlertsOpen(!mobileAlertsOpen)}
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {criticalCount > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full animate-pulse" />}
          </button>
          
          <button className="w-12 h-12 sm:w-10 sm:h-10 rounded-lg glass-panel flex items-center justify-center text-on-surface hover:text-brand transition-colors">
            <span className="material-symbols-outlined text-[20px]">my_location</span>
          </button>
        </div>

        {/* Stats overlay */}
        <div className="absolute top-4 left-4 sm:left-4 z-20 flex flex-wrap gap-2 sm:gap-3 max-w-[calc(100%-80px)]">
          <div className="glass-panel rounded-lg px-3 py-2 sm:px-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono text-on-surface">3 Active</span>
          </div>
          <div className="glass-panel rounded-lg px-3 py-2 sm:px-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono text-error">{criticalCount} Critical</span>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileAlertsOpen && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileAlertsOpen(false)}
        />
      )}

      {/* Right Sidebar — Alerts */}
      <div className={`
        fixed lg:static inset-x-0 bottom-0 z-40 
        lg:w-[30%] h-[55vh] lg:h-full lg:min-w-[320px] lg:max-w-[400px]
        bg-[#0A0F1F] lg:border-l border-t lg:border-t-0 border-white/10
        flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] lg:shadow-none
        transition-transform duration-300 ease-in-out lg:translate-y-0
        rounded-t-2xl lg:rounded-none
        ${mobileAlertsOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>
        {/* Mobile drag handle */}
        <div className="w-full h-6 flex justify-center items-center lg:hidden cursor-pointer" onClick={() => setMobileAlertsOpen(false)}>
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>

        <div className="px-5 pb-3 pt-1 lg:pt-5 sticky top-0 bg-[#0A0F1F]/90 backdrop-blur-md z-10 border-b border-white/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-on-surface">Real-time Alerts</h3>
            <span className="bg-error/10 text-error text-xs font-bold px-2.5 py-1 rounded-full border border-error/20">
              {criticalCount} CRITICAL
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-3 pb-[80px] lg:pb-4">
          {alerts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-outline">
              <span className="material-symbols-outlined text-5xl mb-3 opacity-30">check_circle</span>
              <p className="text-sm">All clear — no active alerts</p>
            </div>
          )}
          {alerts.map(alert => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onDismiss={() => dispatch(dismissAlert(alert.id))}
              onReroute={() => { dispatch(openRouteModal()); toast.success('Analysing routes...') }}
            />
          ))}
        </div>
      </div>

      {/* Shipment Drawer */}
      {showDrawer && <ShipmentDrawer />}

      {/* Route Modal */}
      {showRouteModal && <RouteModal />}
    </div>
  )
}

function AlertCard({ alert, onDismiss, onReroute }) {
  const borderColor = alert.severity === 'critical' ? 'border-l-error' : alert.type === 'temperature' ? 'border-l-secondary-container' : 'border-l-primary'
  const iconColor = alert.severity === 'critical' ? 'text-error' : alert.type === 'temperature' ? 'text-secondary-container' : 'text-primary'

  return (
    <div className={`glass-panel rounded-xl p-4 border-l-4 ${borderColor} relative group hover:bg-white/[0.02] transition-colors`}>
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-outline hover:text-white"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
      <div className="flex items-start gap-3 mb-2">
        <span className={`material-symbols-outlined ${iconColor} mt-0.5 text-[20px]`}>{alert.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-on-surface">{alert.title}</h4>
          <p className="text-xs font-mono text-outline mt-0.5">{alert.shipmentId} • {alert.route}</p>
        </div>
      </div>
      <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">{alert.message}</p>
      <div className="flex gap-2">
        <button onClick={alert.type === 'traffic' ? onReroute : undefined} className="flex-1 bg-brand hover:bg-brand/90 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all">
          {alert.action1}
        </button>
        <button className="flex-1 border border-white/20 hover:border-brand text-brand text-xs font-medium py-2 px-3 rounded-lg transition-colors">
          {alert.action2}
        </button>
      </div>
      <p className="text-[10px] text-outline mt-2 text-right">{alert.time}</p>
    </div>
  )
}
