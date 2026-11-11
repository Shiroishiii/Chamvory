
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Headset, ArrowRight } from 'lucide-react'

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')

        if (!email.trim() || !password.trim()) {
            setError('Preencha todos os campos.')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Informe um e-mail válido.')
            return
        }

        setLoading(true)

        try {
            // Integração com a API será adicionada posteriormente.
            await new Promise((resolve) => setTimeout(resolve, 800))

            setError('Autenticação ainda não configurada.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-5 py-10">

            <div className="w-full max-w-105">

                {/* Logo */}
                <div className="flex flex-col items-center mb-9">

                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                        <Headset size={25} className="text-white" strokeWidth={2} />
                    </div>

                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Chamvory
                    </h1>

                    <p className="text-sm text-[#9CA3AF] mt-1">
                        Sistema de gerenciamento de chamados
                    </p>

                </div>

                {/* Formulário */}
                <div className="bg-white border border-[#EAE9EF] rounded-xl p-7 sm:p-9">

                    <div className="mb-7">
                        <h2 className="text-xl font-semibold text-foreground">
                            Bem-vindo de volta
                        </h2>

                        <p className="text-sm text-[#9CA3AF] mt-2">
                            Entre com suas credenciais para continuar.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* E-mail */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-foreground"
                            >
                                E-mail
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                className="w-full h-11 px-3 rounded-lg border border-[#E5E4EB] bg-white text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-[#B0AEB9]"
                            />
                        </div>

                        {/* Senha */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Senha
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="w-full h-11 px-3 pr-11 rounded-lg border border-[#E5E4EB] bg-white text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-[#B0AEB9]"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-primary transition"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Erro */}
                        {error && (
                            <div
                                role="alert"
                                className="rounded-lg bg-red-50 border border-red-100 px-3 py-2.5 text-sm text-red-600"
                            >
                                {error}
                            </div>
                        )}

                        {/* Entrar */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-[#6D28D9] text-white text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Entrando...' : 'Entrar'}

                            {!loading && <ArrowRight size={17} />}
                        </button>

                    </form>

                    {/* Cadastro */}
                    <div className="mt-7 pt-6 border-t border-[#F0EFF3] text-center">
                        <p className="text-sm text-[#9CA3AF]">
                            Ainda não possui uma conta?{' '}
                            <Link
                                to="/register"
                                className="font-medium text-primary hover:text-[#6D28D9] transition"
                            >
                                Criar conta
                            </Link>
                        </p>
                    </div>

                </div>

                {/* Rodapé */}
                <p className="text-center text-xs text-[#B0AEB9] mt-7">
                    Chamvory · Sistema de Helpdesk
                </p>

            </div>
        </div>
    )
}

export default Login
