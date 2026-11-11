
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

function AppRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chamados" element={<MyTickets />} />
                <Route path="/chamados/novo" element={<CreateTicket />} />
                <Route path="/chamados/:id" element={<TicketDetails />} />

                <Route path="/tecnico/dashboard" element={<TechnicianDashboard />} />
                <Route path="/tecnico/fila" element={<TicketQueue />} />
                <Route path="/tecnico/atendimento/:id" element={<TicketAttendance />} />

                <Route path="/perfil" element={<Profile />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
