import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchWeatherByCity } from '../../services/weatherService'

export default function TopNav() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(s => s.auth)
  const allAlerts = useSelector(s => s.alerts.list)
  const alerts = allAlerts.filter(a => !a.resolved)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeatherByCity('Delhi')
      if (data) setWeather(data)
    }
    getWeather()
    const interval = setInterval(getWeather, 600000) // Update every 10 mins
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed top-0 left-0 sm:left-20 lg:left-64 right-0 z-50 flex justify-between items-center px-4 sm:px-6 h-16 bg-background/80 backdrop-blur-md border-b border-white/10 shadow-[0_0_15px_rgba(24,119,242,0.08)] transition-all duration-300">
      {/* Brand - only show on mobile since SideNav has it for desktop */}
      <div className="flex items-center gap-4 sm:hidden">
        <span className="text-xl font-bold tracking-tighter text-white uppercase font-sans select-none">
          LogiSense
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-2 sm:mx-8 hidden sm:block">
        <div className="relative flex items-center h-10 rounded-lg bg-surface border border-outline-variant/50 focus-within:border-brand transition-all">
          <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">search</span>
          <input
            className="w-full h-full bg-transparent border-none outline-none text-on-surface text-sm pl-10 pr-4 placeholder-outline"
            placeholder="Search shipments, alerts..."
          />
        </div>
      </div>
      
      {/* Search Mobile Placeholder */}
      <div className="flex-1 sm:hidden"></div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Real-time Weather */}
        {weather && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 font-mono">
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
              alt="weather"
              className="w-8 h-8 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-bold text-on-surface uppercase tracking-tighter">{weather.name}</span>
              <span className="text-[13px] text-primary font-bold">{Math.round(weather.main.temp)}°C</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="text-slate-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all">
            <span className="material-symbols-outlined text-[20px]">language</span>
          </button>
          <button className="relative text-slate-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse" />
            )}
          </button>
        </div>

        <div
          className="flex items-center gap-2 ml-1 cursor-pointer group"
          onClick={() => { dispatch(logout()); navigate('/login') }}
        >
          <div className="w-8 h-8 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center text-brand text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-xs text-outline group-hover:text-white transition-colors hidden md:block">
            {user?.name || 'Dispatcher'}
          </span>
        </div>
      </div>
    </header>
  )
}

