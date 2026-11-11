
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, ChevronDown, UserRound, LogOut } from 'lucide-react'

interface HeaderProps {
    onMenuClick?: () => void
    userName?: string
    userEmail?: string
    role?: 'SOLICITANTE' | 'TECNICO'
}

function Header({
    onMenuClick,
    userName = 'Usuário',
    userEmail = 'usuario@email.com',
    role = 'SOLICITANTE',
}: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()

    const pageTitles: Record<string, string> = {
        '/dashboard': 'Visão geral',
        '/chamados': 'Meus chamados',
        '/chamados/novo': 'Novo chamado',
        '/tecnico/dashboard': 'Visão geral',
        '/tecnico/fila': 'Fila de chamados',
        '/tecnico/atendimentos': 'Meus atendimentos',
        '/perfil': 'Meu perfil',
    }

    const title =
        pageTitles[location.pathname] ??
        (location.pathname.startsWith('/chamados/')
            ? 'Detalhes do chamado'
            : location.pathname.startsWith('/tecnico/atendimento/')
                ? 'Atendimento'
                : 'Chamvory')

    return (
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-[#EAE9EF] bg-white px-5 sm:px-8">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Abrir menu"
                    className="rounded-lg p-2 text-[#777386] transition hover:bg-background lg:hidden"
                >
                    <Menu size={21} />
                </button>

                <div>
                    <h1 className="text-base font-semibold text-foreground">
                        {title}
                    </h1>

                    <p className="mt-0.5 hidden text-xs text-[#9CA3AF] sm:block">
                        Bem-vindo ao Chamvory
                    </p>
                </div>
            </div>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-background"
                >
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-medium text-foreground">
                            {userName}
                        </p>

                        <p className="text-xs text-[#9CA3AF]">
                            {role === 'TECNICO' ? 'Técnico' : 'Solicitante'}
                        </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3EEFF] text-sm font-semibold text-primary">
                        {userName.charAt(0).toUpperCase()}
                    </div>

                    <ChevronDown
                        size={16}
                        className={`text-[#9CA3AF] transition ${menuOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {menuOpen && (
                    <>
                        <button
                            type="button"
                            aria-label="Fechar menu"
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 z-40 cursor-default"
                        />

                        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-[#EAE9EF] bg-white p-2 shadow-lg">
                            <div className="border-b border-[#F0EFF3] px-3 py-3">
                                <p className="truncate text-sm font-medium text-foreground">
                                    {userName}
                                </p>

                                <p className="truncate text-xs text-[#9CA3AF]">
                                    {userEmail}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setMenuOpen(false)
                                    window.location.href = '/perfil'
                                }}
                                className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#777386] hover:bg-background hover:text-foreground"
                            >
                                <UserRound size={17} />
                                Meu perfil
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    // TODO: integrar com a função de logout da autenticação.
                                    setMenuOpen(false)
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                            >
                                <LogOut size={17} />
                                Sair
                            </button>
                        </div>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
