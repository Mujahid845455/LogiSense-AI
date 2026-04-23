import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import TopNav from './TopNav'
import SideNav from './SideNav'

export default function ProtectedLayout() {
  const { isAuthenticated } = useSelector(s => s.auth)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden bg-background">
      <SideNav />
      <div className="flex flex-col flex-1 overflow-hidden sm:ml-20 lg:ml-64 w-full relative pb-[64px] sm:pb-0 transition-all duration-300">
        <TopNav />
        <main className="flex-1 overflow-hidden mt-16 w-full relative">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
