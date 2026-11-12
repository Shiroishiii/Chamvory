
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    UserRound,
    Mail,
    MessageSquare,
    Send,
    CheckCircle2,
    ClipboardList,
    History,
    CircleUserRound,
} from 'lucide-react'
import PageTitle from '../../components/shared/PageTitle'

type TicketStatus = 'Aberto' | 'Em atendimento' | 'Finalizado'

interface HistoryEntry {
    id: number
    author: string
    role: string
    message: string
    date: string
    status?: TicketStatus
}

function TicketAttendance() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [status, setStatus] = useState<TicketStatus>('Em atendimento')
    const [observation, setObservation] = useState('')
    const [solution, setSolution] = useState('')
    const [showFinishModal, setShowFinishModal] = useState(false)
    const [history, setHistory] = useState<HistoryEntry[]>([
        {
            id: 1,
            author: 'Mariana Costa',
            role: 'Solicitante',
            message: 'Meu computador não está iniciando. Ao pressionar o botão, nenhuma imagem aparece na tela.',
            date: '10/11/2026 às 09:20',
            status: 'Aberto',
        },
        {
            id: 2,
            author: 'Você',
            role: 'Técnico',
            message: 'Chamado assumido. Vou iniciar a análise do equipamento.',
            date: '10/11/2026 às 10:15',
            status: 'Em atendimento',
        },
    ])

    const ticket = {
        id: id || '1042',
        subject: 'Computador não inicia',
        category: 'Hardware',
        priority: 'Alta',
        requester: 'Mariana Costa',
        email: 'mariana@email.com',
        openedAt: '10/11/2026 às 09:20',
        description:
            'Meu computador não está iniciando. Ao pressionar o botão de energia, os LEDs acendem por alguns segundos, mas não aparece nenhuma imagem na tela. Já tentei desconectar os cabos e ligar novamente, mas o problema continua.',
    }

    const handleAddObservation = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!observation.trim() || status === 'Finalizado') return

        const newEntry: HistoryEntry = {
            id: Date.now(),
            author: 'Você',
            role: 'Técnico',
            message: observation.trim(),
            date: new Date().toLocaleString('pt-BR'),
        }

        setHistory((current) => [...current, newEntry])
        setObservation('')
    }

    const handleFinishTicket = () => {
        if (!solution.trim()) return

        const newEntry: HistoryEntry = {
            id: Date.now(),
            author: 'Você',
            role: 'Técnico',
            message: `Solução aplicada: ${solution.trim()}`,
            date: new Date().toLocaleString('pt-BR'),
            status: 'Finalizado',
        }

        setHistory((current) => [...current, newEntry])
        setStatus('Finalizado')
        setShowFinishModal(false)
        setSolution('')
    }

    const statusStyle: Record<TicketStatus, string> = {
        Aberto: 'bg-blue-50 text-blue-700',
        'Em atendimento': 'bg-amber-50 text-amber-700',
        Finalizado: 'bg-green-50 text-green-700',
    }

    return (
        <div className="space-y-6">
            <Link
                to="/tecnico/atendimentos"
                className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-primary"
            >
                <ArrowLeft size={16} />
                Voltar para meus atendimentos
            </Link>

            <PageTitle
                title={`Chamado #${ticket.id}`}
                description="Detalhes e gerenciamento do atendimento."
                action={
                    <span className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusStyle[status]}`}>
                        {status}
                    </span>
                }
            />

            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.6fr_1fr]">
                <div className="space-y-6">
                    <section className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-xs text-gray-400">Solicitação #{ticket.id}</p>
                                <h2 className="mt-1 text-xl font-semibold text-foreground">{ticket.subject}</h2>
                            </div>

                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${ticket.priority === 'Alta'
                                    ? 'bg-red-50 text-red-700'
                                    : 'bg-amber-50 text-amber-700'
                                }`}>
                                Prioridade {ticket.priority}
                            </span>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-4 border-y border-gray-100 py-4 sm:grid-cols-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <ClipboardList size={17} className="text-gray-400" />
                                Categoria: {ticket.category}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CalendarDays size={17} className="text-gray-400" />
                                Abertura: {ticket.openedAt}
                            </div>
                        </div>

                        <div className="mt-5">
                            <h3 className="text-sm font-semibold text-foreground">Descrição do problema</h3>
                            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                                {ticket.description}
                            </p>
                        </div>
                    </section>

                    <section className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
                        <div className="flex items-center gap-2">
                            <History size={18} className="text-primary" />
                            <h3 className="font-semibold text-foreground">Histórico do atendimento</h3>
                        </div>

                        <div className="mt-6 space-y-6">
                            {history.map((entry, index) => (
                                <div key={entry.id} className="relative flex gap-3">
                                    {index !== history.length - 1 && (
                                        <div className="absolute -bottom-6 left-4 top-9 w-px bg-gray-200" />
                                    )}

                                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-50 text-primary">
                                        <CircleUserRound size={17} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{entry.author}</p>
                                                <p className="text-xs text-gray-400">{entry.role}</p>
                                            </div>
                                            <span className="text-xs text-gray-400">{entry.date}</span>
                                        </div>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">{entry.message}</p>

                                        {entry.status && (
                                            <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[entry.status]}`}>
                                                {entry.status}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {status !== 'Finalizado' && (
                        <section className="rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
                            <div className="flex items-center gap-2">
                                <MessageSquare size={18} className="text-primary" />
                                <h3 className="font-semibold text-foreground">Adicionar observação</h3>
                            </div>

                            <form onSubmit={handleAddObservation} className="mt-4 space-y-3">
                                <textarea
                                    value={observation}
                                    onChange={(event) => setObservation(event.target.value)}
                                    rows={4}
                                    maxLength={2000}
                                    placeholder="Descreva o andamento do atendimento..."
                                    className="w-full resize-y rounded-md border border-gray-200 px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                                    required
                                />

                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                    <span className="text-xs text-gray-400">{observation.length}/2000 caracteres</span>
                                    <button
                                        type="submit"
                                        disabled={!observation.trim()}
                                        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Send size={16} />
                                        Registrar observação
                                    </button>
                                </div>
                            </form>
                        </section>
                    )}
                </div>

                <div className="space-y-6">
                    <section className="rounded-lg border border-gray-200 bg-white p-5">
                        <h3 className="font-semibold text-foreground">Solicitante</h3>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-50 text-primary">
                                <UserRound size={21} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">{ticket.requester}</p>
                                <p className="text-xs text-gray-500">Solicitante</p>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm text-gray-500">
                            <Mail size={16} />
                            <span className="break-all">{ticket.email}</span>
                        </div>
                    </section>

                    <section className="rounded-lg border border-gray-200 bg-white p-5">
                        <h3 className="font-semibold text-foreground">Gerenciar atendimento</h3>

                        <div className="mt-4 space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Status do chamado
                            </label>

                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value as TicketStatus)}
                                disabled={status === 'Finalizado'}
                                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary disabled:bg-gray-50"
                            >
                                <option value="Aberto">Aberto</option>
                                <option value="Em atendimento">Em atendimento</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>

                            <p className="text-xs leading-5 text-gray-400">
                                As alterações de status devem ser registradas no histórico do chamado.
                            </p>

                            {status !== 'Finalizado' && (
                                <button
                                    type="button"
                                    onClick={() => setShowFinishModal(true)}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                                >
                                    <CheckCircle2 size={17} />
                                    Finalizar atendimento
                                </button>
                            )}

                            {status === 'Finalizado' && (
                                <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700">
                                    <CheckCircle2 size={17} />
                                    Este chamado foi finalizado.
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="rounded-lg border border-gray-200 bg-white p-5">
                        <div className="flex items-center gap-2">
                            <Clock3 size={17} className="text-gray-400" />
                            <h3 className="text-sm font-semibold text-foreground">Informações</h3>
                        </div>
                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex justify-between gap-3">
                                <span className="text-gray-500">Número</span>
                                <span className="font-medium text-foreground">#{ticket.id}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                                <span className="text-gray-500">Categoria</span>
                                <span className="font-medium text-foreground">{ticket.category}</span>
                            </div>
                            <div className="flex justify-between gap-3">
                                <span className="text-gray-500">Prioridade</span>
                                <span className="font-medium text-foreground">{ticket.priority}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {showFinishModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600">
                            <CheckCircle2 size={22} />
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-foreground">
                            Finalizar chamado
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-gray-500">
                            Descreva a solução aplicada antes de concluir este atendimento.
                        </p>

                        <textarea
                            value={solution}
                            onChange={(event) => setSolution(event.target.value)}
                            rows={4}
                            maxLength={2000}
                            placeholder="Descreva como o problema foi resolvido..."
                            className="mt-4 w-full resize-y rounded-md border border-gray-200 px-3 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowFinishModal(false)}
                                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleFinishTicket}
                                disabled={!solution.trim()}
                                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Confirmar solução
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TicketAttendance
