
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Search,
    Filter,
    ClipboardList,
    Clock3,
    AlertTriangle,
    ChevronRight,
    RotateCcw,
    UserRound,
} from 'lucide-react'
import PageTitle from '../../components/shared/PageTitle'

type Priority = 'Baixa' | 'Média' | 'Alta'

interface QueueTicket {
    id: number
    subject: string
    description: string
    category: string
    priority: Priority
    requester: string
    openedAt: string
}

const initialTickets: QueueTicket[] = [
    {
        id: 1042,
        subject: 'Computador não inicia',
        description: 'Equipamento liga, mas não apresenta imagem na tela.',
        category: 'Hardware',
        priority: 'Alta',
        requester: 'Mariana Costa',
        openedAt: '2026-11-10T09:20:00',
    },
    {
        id: 1040,
        subject: 'Sem acesso ao sistema',
        description: 'Usuário não consegue entrar no sistema interno.',
        category: 'Acesso',
        priority: 'Alta',
        requester: 'Pedro Henrique',
        openedAt: '2026-11-10T07:45:00',
    },
    {
        id: 1038,
        subject: 'Impressora sem conexão',
        description: 'Impressora não aparece na lista de dispositivos.',
        category: 'Impressora',
        priority: 'Média',
        requester: 'Ana Clara',
        openedAt: '2026-11-09T15:10:00',
    },
    {
        id: 1037,
        subject: 'Internet instável',
        description: 'Conexão apresenta quedas durante o expediente.',
        category: 'Rede',
        priority: 'Média',
        requester: 'Lucas Martins',
        openedAt: '2026-11-09T11:30:00',
    },
    {
        id: 1036,
        subject: 'Instalação de aplicativo',
        description: 'Solicitação de instalação de ferramenta de trabalho.',
        category: 'Software',
        priority: 'Baixa',
        requester: 'Camila Souza',
        openedAt: '2026-11-08T14:00:00',
    },
    {
        id: 1034,
        subject: 'Problema com teclado',
        description: 'Algumas teclas do teclado não estão respondendo.',
        category: 'Hardware',
        priority: 'Baixa',
        requester: 'Rafael Lima',
        openedAt: '2026-11-08T10:15:00',
    },
]

const priorityStyles: Record<Priority, string> = {
    Alta: 'bg-red-50 text-red-700',
    Média: 'bg-amber-50 text-amber-700',
    Baixa: 'bg-gray-100 text-gray-600',
}

function TicketQueue() {
    const [tickets, setTickets] = useState(initialTickets)
    const [search, setSearch] = useState('')
    const [priorityFilter, setPriorityFilter] = useState('Todas')
    const [categoryFilter, setCategoryFilter] = useState('Todas')
    const [sortOrder, setSortOrder] = useState<'oldest' | 'newest'>('oldest')
    const [feedback, setFeedback] = useState('')

    const filteredTickets = useMemo(() => {
        const filtered = tickets.filter((ticket) => {
            const searchValue = search.toLowerCase()

            const matchesSearch =
                ticket.subject.toLowerCase().includes(searchValue) ||
                ticket.requester.toLowerCase().includes(searchValue) ||
                String(ticket.id).includes(searchValue)

            const matchesPriority =
                priorityFilter === 'Todas' || ticket.priority === priorityFilter

            const matchesCategory =
                categoryFilter === 'Todas' || ticket.category === categoryFilter

            return matchesSearch && matchesPriority && matchesCategory
        })

        // Ordenação crescente ou decrescente pela data de abertura.
        // A fila padrão apresenta os chamados mais antigos primeiro.
        return filtered.sort((a, b) => {
            const difference =
                new Date(a.openedAt).getTime() - new Date(b.openedAt).getTime()

            return sortOrder === 'oldest' ? difference : -difference
        })
    }, [tickets, search, priorityFilter, categoryFilter, sortOrder])

    const handleAssumeTicket = (ticketId: number) => {
        const ticket = tickets.find((item) => item.id === ticketId)

        if (!ticket) return

        setTickets((current) => current.filter((item) => item.id !== ticketId))
        setFeedback(`Chamado #${ticketId} assumido com sucesso.`)
    }

    const clearFilters = () => {
        setSearch('')
        setPriorityFilter('Todas')
        setCategoryFilter('Todas')
        setSortOrder('oldest')
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const highPriorityCount = tickets.filter((ticket) => ticket.priority === 'Alta').length

    return (
        <div className="space-y-7">
            <PageTitle
                title="Fila de chamados"
                description="Visualize as solicitações disponíveis e assuma novos atendimentos."
            />

            {feedback && (
                <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    <span>{feedback}</span>
                    <button
                        type="button"
                        onClick={() => setFeedback('')}
                        className="font-medium hover:underline"
                    >
                        Fechar
                    </button>
                </div>
            )}

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Chamados disponíveis</span>
                        <ClipboardList size={19} className="text-primary" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-foreground">{tickets.length}</p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Prioridade alta</span>
                        <AlertTriangle size={19} className="text-red-600" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-foreground">{highPriorityCount}</p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Categorias</span>
                        <Filter size={19} className="text-gray-500" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-foreground">
                        {new Set(tickets.map((ticket) => ticket.category)).size}
                    </p>
                </div>
            </section>

            <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="border-b border-gray-100 p-5">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <h3 className="font-semibold text-foreground">Chamados disponíveis</h3>
                            <p className="mt-1 text-xs text-gray-500">
                                Os chamados são organizados por data de abertura.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative flex-1">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Pesquisar chamado..."
                                    className="w-full rounded-md border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary sm:w-64"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50"
                            >
                                <RotateCcw size={15} />
                                Limpar filtros
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <select
                            value={priorityFilter}
                            onChange={(event) => setPriorityFilter(event.target.value)}
                            className="rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-primary"
                        >
                            <option value="Todas">Todas as prioridades</option>
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                        </select>

                        <select
                            value={categoryFilter}
                            onChange={(event) => setCategoryFilter(event.target.value)}
                            className="rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-primary"
                        >
                            <option value="Todas">Todas as categorias</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Software">Software</option>
                            <option value="Rede">Rede</option>
                            <option value="Acesso">Acesso</option>
                            <option value="Impressora">Impressora</option>
                            <option value="Outros">Outros</option>
                        </select>

                        <select
                            value={sortOrder}
                            onChange={(event) => setSortOrder(event.target.value as 'oldest' | 'newest')}
                            className="rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-primary"
                        >
                            <option value="oldest">Mais antigos primeiro</option>
                            <option value="newest">Mais recentes primeiro</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-5 py-3">
                    <span className="text-xs text-gray-500">
                        {filteredTickets.length} chamado(s) encontrado(s)
                    </span>
                    <span className="hidden items-center gap-1 text-xs text-gray-500 sm:flex">
                        <Clock3 size={14} />
                        Ordenação por abertura
                    </span>
                </div>

                {filteredTickets.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {filteredTickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="flex flex-col gap-4 p-5 transition hover:bg-gray-50/70 lg:flex-row lg:items-center lg:justify-between"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xs font-medium text-gray-400">#{ticket.id}</span>
                                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                                            {ticket.category}
                                        </span>
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[ticket.priority]}`}>
                                            {ticket.priority}
                                        </span>
                                    </div>

                                    <h4 className="mt-2 text-sm font-semibold text-foreground">
                                        {ticket.subject}
                                    </h4>

                                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                                        {ticket.description}
                                    </p>

                                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                                        <span className="inline-flex items-center gap-1">
                                            <UserRound size={14} />
                                            {ticket.requester}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <Clock3 size={14} />
                                            {formatDate(ticket.openedAt)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <Link
                                        to={`/tecnico/atendimento/${ticket.id}`}
                                        className="inline-flex items-center justify-center gap-1 rounded-md border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                                    >
                                        Detalhes
                                        <ChevronRight size={15} />
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => handleAssumeTicket(ticket.id)}
                                        className="rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
                                    >
                                        Assumir chamado
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                            <ClipboardList size={22} />
                        </div>
                        <h3 className="mt-4 text-sm font-semibold text-foreground">
                            Nenhum chamado encontrado
                        </h3>
                        <p className="mt-1 max-w-sm text-sm text-gray-500">
                            Não existem chamados que correspondam aos filtros selecionados.
                        </p>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-4 text-sm font-medium text-primary hover:text-primary-dark"
                        >
                            Limpar filtros
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}

export default TicketQueue
