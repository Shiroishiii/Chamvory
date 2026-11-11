
import { Outlet } from 'react-router-dom'

function AuthLayout() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <Outlet />
            </div>
        </main>
    )
}

export default AuthLayout
