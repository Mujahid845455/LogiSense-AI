import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import shipmentsReducer from './shipmentsSlice'
import alertsReducer from './alertsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shipments: shipmentsReducer,
    alerts: alertsReducer,
  },
})
