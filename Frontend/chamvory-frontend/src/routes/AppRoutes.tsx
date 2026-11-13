
import { Navigate, Route, Routes } from 'react-router-dom'

import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/requester/Dashboard'
import CreateTicket from '../pages/requester/CreateTicket'
import MyTickets from '../pages/requester/MyTickets'
import TicketDetails from '../pages/requester/TicketDetails'
import Profile from '../pages/profile/Profile'
import TechnicianDashboard from '../pages/technician/Dashboard'
import TicketAttendance from '../pages/technician/TicketAttendance'
import TicketQueue from '../pages/technician/TicketQueue'
import NotFound from '../pages/NotFound'
import PrivateRoute from './PrivateRoute'
import { useAuth } from '../hooks/useAuth'

function AppRoutes() {
    const { user } = useAuth()
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={user?.perfil === 'TECNICO' ? <Navigate to="/tecnico/dashboard" replace /> : <Dashboard />} />
                <Route path="/chamados" element={<MyTickets />} />
                <Route path="/chamados/novo" element={<CreateTicket />} />
                <Route path="/chamados/:id" element={<TicketDetails />} />
                <Route path="/perfil" element={<Profile />} />
            </Route>
            </Route>

            <Route element={<PrivateRoute role="TECNICO" />}>
            <Route element={<DashboardLayout />}>
                <Route path="/tecnico/dashboard" element={<TechnicianDashboard />} />
                <Route path="/tecnico/fila" element={<TicketQueue />} />
                <Route path="/tecnico/atendimento/:id" element={<TicketAttendance />} />
            </Route>
            </Route>

            <Route path="/" element={<Navigate to={user ? (user.perfil === 'TECNICO' ? '/tecnico/dashboard' : '/dashboard') : '/login'} replace />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
