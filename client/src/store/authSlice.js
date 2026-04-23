import { createSlice } from '@reduxjs/toolkit'

const stored = JSON.parse(localStorage.getItem('logisense_user') || 'null')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: stored,
    token: localStorage.getItem('logisense_token') || null,
    isAuthenticated: !!stored,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('logisense_user', JSON.stringify(action.payload.user))
      localStorage.setItem('logisense_token', action.payload.token)
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('logisense_user')
      localStorage.removeItem('logisense_token')
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
