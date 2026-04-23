import { createSlice } from '@reduxjs/toolkit'

const DEMO_ALERTS = [
  { id: 'ALT-001', type: 'traffic', severity: 'critical', title: 'Route Blockage Detected', shipmentId: 'TRK-892A', route: 'Mumbai-Pune Exp', message: 'Unexpected heavy traffic congestion ahead. Estimated delay: +45 mins.', icon: 'warning', color: 'error', action1: 'Suggest Reroute', action2: 'View on Map', resolved: false, time: '2 min ago' },
  { id: 'ALT-002', type: 'temperature', severity: 'high', title: 'Temperature Variance', shipmentId: 'C-44B', route: 'Cold Chain Logistics', message: 'Cargo temp approaching critical threshold (4°C). Immediate check required.', icon: 'thermostat', color: 'secondary-container', action1: 'Contact Driver', action2: 'Details', resolved: false, time: '8 min ago' },
  { id: 'ALT-003', type: 'fuel', severity: 'critical', title: 'Low Fuel Level', shipmentId: 'TRK-110C', route: 'NH-44', message: 'Vehicle reporting < 10% fuel. Next station 40km away.', icon: 'battery_alert', color: 'error', action1: 'Dispatch Support', action2: 'View Stations', resolved: false, time: '15 min ago' },
  { id: 'ALT-004', type: 'weather', severity: 'medium', title: 'Heavy Rain Alert', shipmentId: 'TRK-220D', route: 'NH-48 Mumbai', message: 'IMD predicts heavy rainfall in the next 2 hours. Visibility may be reduced.', icon: 'rainy', color: 'primary', action1: 'Notify Driver', action2: 'Details', resolved: false, time: '22 min ago' },
]

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: { list: DEMO_ALERTS },
  reducers: {
    dismissAlert(state, action) {
      state.list = state.list.filter(a => a.id !== action.payload)
    },
    resolveAlert(state, action) {
      const a = state.list.find(a => a.id === action.payload)
      if (a) a.resolved = true
    },
    addAlert(state, action) {
      state.list.unshift(action.payload)
    },
  },
})

export const { dismissAlert, resolveAlert, addAlert } = alertsSlice.actions
export default alertsSlice.reducer
