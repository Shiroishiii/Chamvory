
import { NavLink, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Ticket,
    Plus,
    ClipboardList,
    UserRound,
    Headset,
    LogOut,
    X,
} from 'lucide-react'

interface SidebarProps {
    role?: 'SOLICITANTE' | 'TECNICO'
    open?: boolean
    onClose?: () => void
}

function Sidebar({
    role = 'SOLICITANTE',
    open = false,
    onClose,
}: SidebarProps) {
    const location = useLocation()
    const isTechnician = role === 'TECNICO'

    const requesterLinks = [
        { label: 'Visão geral', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Meus chamados', path: '/chamados', icon: Ticket },
        { label: 'Novo chamado', path: '/chamados/novo', icon: Plus },
    ]

    const technicianLinks = [
        { label: 'Visão geral', path: '/tecnico/dashboard', icon: LayoutDashboard },
        { label: 'Fila de chamados', path: '/tecnico/fila', icon: ClipboardList },
        { label: 'Meus atendimentos', path: '/tecnico/atendimentos', icon: Ticket },
    ]

    const links = isTechnician ? technicianLinks : requesterLinks

    function isActive(path: string) {
        if (path === '/chamados') {
            return location.pathname === path
        }

        return location.pathname === path
    }

    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Fechar menu"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                />
            )}

            <aside
                className={`
          fixed inset-y-0 left-0 z-50 flex w-65 flex-col
          border-r border-[#EAE9EF] bg-white
          transition-transform duration-200
          lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex h-18 items-center justify-between border-b border-[#F0EFF3] px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                            <Headset size={20} className="text-white" />
                        </div>

                        <span className="text-lg font-semibold tracking-tight text-foreground">
                            Chamvory
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#9CA3AF] hover:text-foreground lg:hidden"
                        aria-label="Fechar menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-4 pt-7">
                    <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#A5A2B0]">
                        Menu principal
                    </p>

                    <nav className="space-y-1">
                        {links.map(({ label, path, icon: Icon }) => (
                            <NavLink
                                key={path}
                                to={path}
                                onClick={onClose}
                                className={() => `
                  flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition
                  ${isActive(path)
                                        ? 'bg-[#F3EEFF] text-primary'
                                        : 'text-[#777386] hover:bg-background hover:text-foreground'
                                    }
                `}
                            >
                                <Icon size={18} strokeWidth={1.8} />
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto border-t border-[#F0EFF3] p-4">
                    <NavLink
                        to="/perfil"
                        onClick={onClose}
                        className={({ isActive }) => `
              flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition
              ${isActive
                                ? 'bg-[#F3EEFF] text-primary'
                                : 'text-[#777386] hover:bg-background hover:text-foreground'
                            }
            `}
                    >
                        <UserRound size={18} strokeWidth={1.8} />
                        Meu perfil
                    </NavLink>

                    <button
                        type="button"
                        onClick={() => {
                            // TODO: integrar com a função de logout da autenticação.
                        }}
                        className="mt-1 flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-[#777386] transition hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={18} strokeWidth={1.8} />
                        Sair
                    </button>

                    <div className="mt-4 px-3 text-[11px] text-[#B0AEB9]">
                        Chamvory · Helpdesk
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
