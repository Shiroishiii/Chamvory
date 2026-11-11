
import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    Search,
    Plus,
    ArrowUpRight,
    Ticket,
    Filter,
} from 'lucide-react'
import PageTitle from '../../components/shared/PageTitle'

type TicketStatus = 'Aberto' | 'Em atendimento' | 'Finalizado'
type TicketPriority = 'Baixa' | 'Média' | 'Alta'

interface TicketItem {
    id: number
    subject: string
    category: string
    date: string
    status: TicketStatus
    priority: TicketPriority
}

const mockTickets: TicketItem[] = [
    {
        id: 1024,
        subject: 'Problema ao acessar o sistema',
        category: 'Acesso e login',
        date: '10/11/2026',
        status: 'Em atendimento',
        priority: 'Alta',
    },
    {
        id: 1023,
        subject: 'Solicitação de instalação de software',
        category: 'Software',
        date: '09/11/2026',
        status: 'Aberto',
        priority: 'Média',
    },
    {
        id: 1022,
        subject: 'Computador apresentando lentidão',
        category: 'Hardware',
        date: '08/11/2026',
        status: 'Finalizado',
        priority: 'Baixa',
    },
    {
        id: 1021,
        subject: 'Problema com conexão à internet',
        category: 'Rede',
        date: '07/11/2026',
        status: 'Finalizado',
        priority: 'Alta',
    },
    {
        id: 1020,
        subject: 'Solicitação de acesso à impressora',
        category: 'Impressoras',
        date: '06/11/2026',
        status: 'Aberto',
        priority: 'Baixa',
    },
]

const statusStyles: Record<TicketStatus, string> = {
    Aberto: 'bg-blue-50 text-blue-700',
    'Em atendimento': 'bg-amber-50 text-amber-700',
    Finalizado: 'bg-green-50 text-green-700',
}

const priorityStyles: Record<TicketPriority, string> = {
    Alta: 'text-red-600',
    Média: 'text-orange-600',
    Baixa: 'text-gray-500',
}

function MyTickets() {
    const location = useLocation()

    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('Todos')
    const [priorityFilter, setPriorityFilter] = useState('Todas')

    const successMessage = location.state?.success as string | undefined

    const filteredTickets = useMemo(() => {
        return mockTickets.filter((ticket) => {
            const matchesSearch =
                ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
                ticket.id.toString().includes(search)

            const matchesStatus =
                statusFilter === 'Todos' || ticket.status === statusFilter

            const matchesPriority =
                priorityFilter === 'Todas' || ticket.priority === priorityFilter

            return matchesSearch && matchesStatus && matchesPriority
        })
    }, [search, statusFilter, priorityFilter])

    return (
        <div>
            <PageTitle
                title="Meus chamados"
                description="Consulte e acompanhe todas as suas solicitações."
                action={
                    <Link
                        to="/chamados/novo"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:bg-[#6D28D9]"
                    >
                        <Plus size={17} />
                        Novo chamado
                    </Link>
                }
            />

            {successMessage && (
                <div
                    role="status"
                    className="mb-5 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                    {successMessage}
                </div>
            )}

            {/* Resumo */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                    { label: 'Total', value: mockTickets.length },
                    {
                        label: 'Abertos',
                        value: mockTickets.filter((t) => t.status === 'Aberto').length,
                    },
                    {
                        label: 'Em atendimento',
                        value: mockTickets.filter((t) => t.status === 'Em atendimento').length,
                    },
                    {
                        label: 'Finalizados',
                        value: mockTickets.filter((t) => t.status === 'Finalizado').length,
                    },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="rounded-xl border border-[#EAE9EF] bg-white p-4"
                    >
                        <p className="text-xs text-[#9CA3AF]">{item.label}</p>
                        <p className="mt-2 text-xl font-semibold text-foreground">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Filtros */}
            <section className="overflow-hidden rounded-xl border border-[#EAE9EF] bg-white">
                <div className="flex flex-col gap-3 border-b border-[#F0EFF3] p-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A5A2B0]"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Pesquisar por assunto ou número..."
                            className="h-10 w-full rounded-lg border border-[#E5E4EB] pl-10 pr-3 text-sm text-foreground outline-none transition placeholder:text-[#B0AEB9] focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative">
                            <Filter
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                            />

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="h-10 w-full rounded-lg border border-[#E5E4EB] bg-white pl-9 pr-8 text-sm text-[#777386] outline-none focus:border-primary sm:w-44"
                            >
                                <option value="Todos">Todos os status</option>
                                <option value="Aberto">Aberto</option>
                                <option value="Em atendimento">Em atendimento</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </div>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="h-10 w-full rounded-lg border border-[#E5E4EB] bg-white px-3 text-sm text-[#777386] outline-none focus:border-primary sm:w-40"
                        >
                            <option value="Todas">Todas as prioridades</option>
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                        </select>
                    </div>
                </div>

                {/* Tabela */}
                {filteredTickets.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-180 text-left">
                            <thead>
                                <tr className="border-b border-[#F0EFF3] bg-[#FAFAFC]">
                                    <th className="px-5 py-3.5 text-xs font-medium text-[#9CA3AF]">
                                        Chamado
                                    </th>
                                    <th className="px-5 py-3.5 text-xs font-medium text-[#9CA3AF]">
                                        Categoria
                                    </th>
                                    <th className="px-5 py-3.5 text-xs font-medium text-[#9CA3AF]">
                                        Abertura
                                    </th>
                                    <th className="px-5 py-3.5 text-xs font-medium text-[#9CA3AF]">
                                        Prioridade
                                    </th>
                                    <th className="px-5 py-3.5 text-xs font-medium text-[#9CA3AF]">
                                        Status
                                    </th>
                                    <th className="px-5 py-3.5 text-xs font-medium text-[#9CA3AF]">
                                        Ação
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredTickets.map((ticket) => (
                                    <tr
                                        key={ticket.id}
                                        className="border-b border-[#F0EFF3] last:border-0 transition hover:bg-[#FCFBFE]"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="text-sm font-medium text-foreground">
                                                {ticket.subject}
                                            </p>
                                            <p className="mt-1 text-xs text-[#9CA3AF]">
                                                #{ticket.id}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#777386]">
                                            {ticket.category}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[#777386]">
                                            {ticket.date}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`text-sm font-medium ${priorityStyles[ticket.priority]}`}
                                            >
                                                {ticket.priority}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${statusStyles[ticket.status]}`}
                                            >
                                                {ticket.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <Link
                                                to={`/chamados/${ticket.id}`}
                                                aria-label={`Ver chamado ${ticket.id}`}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#9CA3AF] transition hover:bg-[#F3EEFF] hover:text-primary"
                                            >
                                                <ArrowUpRight size={17} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center px-5 py-14 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F3EEFF]">
                            <Ticket size={22} className="text-primary" />
                        </div>

                        <h3 className="text-sm font-semibold text-foreground">
                            Nenhum chamado encontrado
                        </h3>

                        <p className="mt-1 max-w-sm text-sm text-[#9CA3AF]">
                            Tente alterar os filtros ou pesquisar por outro termo.
                        </p>
                    </div>
                )}

                <div className="border-t border-[#F0EFF3] px-5 py-3">
                    <p className="text-xs text-[#9CA3AF]">
                        Exibindo {filteredTickets.length} de {mockTickets.length} chamados
                    </p>
                </div>
            </section>
        </div>
    )
}

export default MyTickets
