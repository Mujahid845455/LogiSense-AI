import { createSlice } from '@reduxjs/toolkit'

const DEMO_SHIPMENTS = [
  { id: 'LSI-8829-MUM', origin: 'Warehouse Alpha, Delhi', destination: 'Port Terminal, Mumbai', status: 'delayed', riskScore: 75, currentLocation: 'Western Express Hwy', speed: 45, driver: 'Ramesh Kumar', vehicle: 'TRK-892A', eta: '14:30', cargo: 'Electronics' },
  { id: 'LSI-4410-BLR', origin: 'Hub Pune', destination: 'Warehouse Bangalore', status: 'in_transit', riskScore: 22, currentLocation: 'NH-48 Pune', speed: 62, driver: 'Suresh Patel', vehicle: 'TRK-110C', eta: '18:00', cargo: 'FMCG' },
  { id: 'LSI-7712-CHN', origin: 'Factory Surat', destination: 'Port Chennai', status: 'in_transit', riskScore: 35, currentLocation: 'NH-44 Hyderabad', speed: 58, driver: 'Vijay Singh', vehicle: 'C-44B', eta: '22:00', cargo: 'Cold Chain' },
  { id: 'LSI-3301-DEL', origin: 'Hub Mumbai', destination: 'Warehouse Delhi', status: 'delivered', riskScore: 0, currentLocation: 'Delivered', speed: 0, driver: 'Mohan Das', vehicle: 'TRK-220D', eta: 'Delivered', cargo: 'Pharma' },
]

const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState: {
    list: DEMO_SHIPMENTS,
    selected: null,
    showDrawer: false,
    showRouteModal: false,
  },
  reducers: {
    selectShipment(state, action) {
      state.selected = state.list.find(s => s.id === action.payload) || null
      state.showDrawer = true
    },
    closeDrawer(state) {
      state.showDrawer = false
      state.selected = null
    },
    openRouteModal(state) { state.showRouteModal = true },
    closeRouteModal(state) { state.showRouteModal = false },
    updateRiskScore(state, action) {
      const ship = state.list.find(s => s.id === action.payload.id)
      if (ship) ship.riskScore = action.payload.score
    },
  },
})

export const { selectShipment, closeDrawer, openRouteModal, closeRouteModal, updateRiskScore } = shipmentsSlice.actions
export default shipmentsSlice.reducer
