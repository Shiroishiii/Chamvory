import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function PrivateRoute({ role }: { role?: 'SOLICITANTE' | 'TECNICO' }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="p-8 text-sm text-gray-500">Carregando sessão...</div>
  if (!user) return <Navigate to="/login" replace />
  if (role && user.perfil !== role) return <Navigate to={user.perfil === 'TECNICO' ? '/tecnico/dashboard' : '/dashboard'} replace />
  return <Outlet />
}
