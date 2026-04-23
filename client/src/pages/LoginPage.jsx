import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import toast from 'react-hot-toast'

const roles = [
  { id: 'dispatcher', label: 'Dispatcher', icon: 'admin_panel_settings' },
  { id: 'manager', label: 'Manager', icon: 'supervised_user_circle' },
  { id: 'driver', label: 'Driver', icon: 'local_shipping' },
]

// Demo credentials
const DEMO_USERS = {
  'IND-DS-001': { password: 'demo123', name: 'Arjun Sharma', role: 'dispatcher' },
  'IND-MG-001': { password: 'demo123', name: 'Priya Singh', role: 'manager' },
  'IND-DR-001': { password: 'demo123', name: 'Ramesh Kumar', role: 'driver' },
}

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('dispatcher')
  const [terminalId, setTerminalId] = useState('')
  const [authKey, setAuthKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState('en')

  const labels = {
    en: { title: 'LogiSense India', subtitle: 'Command & Control Authentication', selectRole: 'Select Role', terminalId: 'Terminal ID / Phone', authKey: 'Authentication Key', submit: 'Initialize Session', help: 'Require technical assistance?', switchLang: 'Switch to Hindi' },
    hi: { title: 'LogiSense India', subtitle: 'कमांड और नियंत्रण प्रमाणीकरण', selectRole: 'भूमिका चुनें', terminalId: 'टर्मिनल आईडी / फ़ोन', authKey: 'प्रमाणीकरण कुंजी', submit: 'सत्र प्रारंभ करें', help: 'तकनीकी सहायता चाहिए?', switchLang: 'Switch to English' },
  }
  const t = labels[lang]

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))

    const user = DEMO_USERS[terminalId.toUpperCase()]
    if (user && authKey === user.password) {
      dispatch(login({ user: { name: user.name, role: user.role, terminalId }, token: 'demo-jwt-token-' + Date.now() }))
      toast.success(`Welcome back, ${user.name}!`)
      navigate('/dashboard')
    } else if (!terminalId || !authKey) {
      // allow demo login with empty fields
      dispatch(login({ user: { name: 'Demo Dispatcher', role: selectedRole, terminalId: 'DEMO' }, token: 'demo-jwt-token-' + Date.now() }))
      toast.success('Logged in as Demo User')
      navigate('/dashboard')
    } else {
      toast.error('Invalid credentials. Try IND-DS-001 / demo123')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0F1F] flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1F] via-[#0d1526] to-[#0A0F1F]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-container/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter text-white uppercase font-sans">
            {t.title}
          </h1>
          <p className="text-sm text-outline mt-2">{t.subtitle}</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-xl p-6 shadow-2xl">
          {/* Language Toggle */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 text-on-surface hover:text-secondary-container transition-colors text-xs font-bold uppercase tracking-wider"
            >
              {t.switchLang}
              <span className="material-symbols-outlined text-secondary-container text-[18px]">language</span>
            </button>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-outline mb-3">{t.selectRole}</label>
            <div className="grid grid-cols-3 gap-1">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`relative py-2.5 px-2 rounded border flex flex-col items-center gap-1 transition-all focus:outline-none ${
                    selectedRole === r.id
                      ? 'border-secondary-container bg-secondary-container/10 ring-2 ring-secondary-container ring-offset-1 ring-offset-[#0A0F1F]'
                      : 'border-white/10 bg-[#080C16] hover:border-brand/50'
                  }`}
                >
                  <span className={`material-symbols-outlined text-lg ${selectedRole === r.id ? 'text-secondary-container' : 'text-outline'}`}>
                    {r.icon}
                  </span>
                  <span className={`text-[10px] font-bold leading-none ${selectedRole === r.id ? 'text-white' : 'text-outline'}`}>
                    {r.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono mb-2 text-outline">{t.terminalId}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">badge</span>
                <input
                  value={terminalId}
                  onChange={e => setTerminalId(e.target.value)}
                  className="w-full bg-[#080C16] border border-white/10 rounded-lg py-3 pl-10 pr-4 font-mono text-sm text-white placeholder-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 outline-none transition-all"
                  placeholder="IND-DS-001"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono mb-2 text-outline">{t.authKey}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">key</span>
                <input
                  type="password"
                  value={authKey}
                  onChange={e => setAuthKey(e.target.value)}
                  className="w-full bg-[#080C16] border border-white/10 rounded-lg py-3 pl-10 pr-4 font-mono text-sm text-white placeholder-outline focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand hover:bg-brand/90 text-white font-semibold rounded-lg py-3 relative overflow-hidden transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(24,119,242,0.25)] hover:shadow-[0_0_30px_rgba(24,119,242,0.4)] group flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {t.submit}
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-5 text-center">
            <p className="text-xs text-outline">
              Demo: <span className="text-primary font-mono">IND-DS-001</span> / <span className="text-primary font-mono">demo123</span>
              <span className="text-outline"> or leave blank</span>
            </p>
          </div>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-primary hover:text-white transition-colors border-b border-transparent hover:border-white">
              {t.help}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-outline opacity-40 uppercase tracking-widest font-mono">
            Secure Connection v2.4.1 • System Nominal
          </p>
        </div>
      </div>
    </div>
  )
}
