
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar e Header serão adicionados aqui */}
            <main className="p-6 md:p-8">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
