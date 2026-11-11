
import { useState } from 'react'
import {
    UserRound,
    Mail,
    ShieldCheck,
    LockKeyhole,
    Eye,
    EyeOff,
    Save,
} from 'lucide-react'
import PageTitle from '../../components/shared/PageTitle'

function Profile() {
    const [name, setName] = useState('João da Silva')
    const [email, setEmail] = useState('joao@email.com')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    // Dados temporários até a integração com a autenticação.
    // const userRole = 'SOLICITANTE'

    async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setMessage('')
        setError('')

        if (!name.trim() || !email.trim()) {
            setError('Preencha todos os campos obrigatórios.')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Informe um e-mail válido.')
            return
        }

        setLoading(true)

        try {
            // TODO: integrar com a API de atualização de perfil.
            await new Promise((resolve) => setTimeout(resolve, 700))
            setMessage('Informações atualizadas com sucesso.')
        } catch {
            setError('Não foi possível atualizar seu perfil.')
        } finally {
            setLoading(false)
        }
    }

    async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setMessage('')
        setError('')

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Preencha todos os campos de senha.')
            return
        }

        if (newPassword.length < 8) {
            setError('A nova senha deve possuir pelo menos 8 caracteres.')
            return
        }

        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.')
            return
        }

        setLoading(true)

        try {
            // TODO: integrar com a API de alteração de senha.
            await new Promise((resolve) => setTimeout(resolve, 700))

            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setMessage('Senha alterada com sucesso.')
        } catch {
            setError('Não foi possível alterar sua senha.')
        } finally {
            setLoading(false)
        }
    }

    // const roleLabel = userRole === 'TECNICO' ? 'Técnico' : 'Solicitante'

    return (
        <div>
            <PageTitle
                title="Meu perfil"
                description="Gerencie suas informações pessoais e configurações de conta."
            />

            {(message || error) && (
                <div
                    role={error ? 'alert' : 'status'}
                    className={`mb-6 rounded-lg border px-4 py-3 text-sm ${error
                            ? 'border-red-100 bg-red-50 text-red-600'
                            : 'border-green-100 bg-green-50 text-green-700'
                        }`}
                >
                    {error || message}
                </div>
            )}

            {/* Informações da conta */}
            <section className="mb-6 rounded-xl border border-[#EAE9EF] bg-white p-5 sm:p-7">
                <div className="mb-6 flex items-center gap-3 border-b border-[#F0EFF3] pb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3EEFF] text-primary">
                        <UserRound size={21} />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-foreground">
                            Informações pessoais
                        </h2>
                        <p className="mt-1 text-sm text-[#9CA3AF]">
                            Atualize seus dados de identificação.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-foreground"
                        >
                            Nome completo
                        </label>

                        <div className="relative">
                            <UserRound
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A5A2B0]"
                            />

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-11 w-full rounded-lg border border-[#E5E4EB] pl-10 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-foreground"
                        >
                            E-mail
                        </label>

                        <div className="relative">
                            <Mail
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A5A2B0]"
                            />

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 w-full rounded-lg border border-[#E5E4EB] pl-10 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                            Tipo de conta
                        </label>

                        <div className="flex h-11 items-center justify-between rounded-lg border border-[#E5E4EB] bg-[#FAFAFC] px-3">
                            <div className="flex items-center gap-2 text-sm text-[#777386]">
                                <ShieldCheck size={17} className="text-primary" />
                                {/* {roleLabel} */}
                            </div>

                            <span className="text-xs text-[#9CA3AF]">
                                Não editável
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end border-t border-[#F0EFF3] pt-5">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={16} />
                            {loading ? 'Salvando...' : 'Salvar alterações'}
                        </button>
                    </div>
                </form>
            </section>

            {/* Alteração de senha */}
            <section className="rounded-xl border border-[#EAE9EF] bg-white p-5 sm:p-7">
                <div className="mb-6 flex items-center gap-3 border-b border-[#F0EFF3] pb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3EEFF] text-primary">
                        <LockKeyhole size={21} />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-foreground">
                            Segurança da conta
                        </h2>
                        <p className="mt-1 text-sm text-[#9CA3AF]">
                            Altere sua senha para manter sua conta protegida.
                        </p>
                    </div>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                    {[
                        {
                            id: 'currentPassword',
                            label: 'Senha atual',
                            value: currentPassword,
                            setValue: setCurrentPassword,
                            show: showCurrent,
                            toggle: () => setShowCurrent(!showCurrent),
                        },
                        {
                            id: 'newPassword',
                            label: 'Nova senha',
                            value: newPassword,
                            setValue: setNewPassword,
                            show: showNew,
                            toggle: () => setShowNew(!showNew),
                        },
                        {
                            id: 'confirmPassword',
                            label: 'Confirmar nova senha',
                            value: confirmPassword,
                            setValue: setConfirmPassword,
                            show: showConfirm,
                            toggle: () => setShowConfirm(!showConfirm),
                        },
                    ].map((field) => (
                        <div key={field.id} className="space-y-2">
                            <label
                                htmlFor={field.id}
                                className="block text-sm font-medium text-foreground"
                            >
                                {field.label}
                            </label>

                            <div className="relative">
                                <input
                                    id={field.id}
                                    type={field.show ? 'text' : 'password'}
                                    value={field.value}
                                    onChange={(e) => field.setValue(e.target.value)}
                                    autoComplete="current-password"
                                    className="h-11 w-full rounded-lg border border-[#E5E4EB] px-3 pr-11 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />

                                <button
                                    type="button"
                                    onClick={field.toggle}
                                    aria-label={field.show ? 'Ocultar senha' : 'Mostrar senha'}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition hover:text-primary"
                                >
                                    {field.show ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    ))}

                    <p className="text-xs text-[#9CA3AF]">
                        A nova senha deve possuir pelo menos 8 caracteres.
                    </p>

                    <div className="flex justify-end border-t border-[#F0EFF3] pt-5">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E5E4EB] px-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <LockKeyhole size={16} />
                            {loading ? 'Atualizando...' : 'Alterar senha'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Profile
