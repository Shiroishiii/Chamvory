import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function DashboardLayout() {
  const { user, logout } = useAuth(); const navigate = useNavigate()
  async function handleLogout() { await logout(); navigate('/login', { replace: true }) }
  return <div className="min-h-screen bg-background"><header className="border-b bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4"><Link to={user?.perfil==='TECNICO'?'/tecnico/dashboard':'/dashboard'} className="text-lg font-semibold text-primary">Chamvory</Link><nav className="flex flex-wrap items-center gap-4 text-sm"><Link to={user?.perfil==='TECNICO'?'/tecnico/dashboard':'/dashboard'}>Dashboard</Link>{user?.perfil==='TECNICO'?<Link to="/tecnico/fila">Fila de chamados</Link>:<><Link to="/chamados">Meus chamados</Link><Link to="/chamados/novo">Novo chamado</Link></>}<Link to="/perfil">Perfil</Link><span className="text-gray-500">{user?.nome}</span><button onClick={()=>void handleLogout()} className="rounded border px-3 py-1.5">Sair</button></nav></div></header><main className="mx-auto max-w-7xl p-5 md:p-8"><Outlet/></main></div>
}
