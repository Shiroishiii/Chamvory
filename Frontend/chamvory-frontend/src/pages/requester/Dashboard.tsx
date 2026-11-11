
import { Link } from 'react-router-dom'
import {
    Plus,
    Ticket,
    Clock3,
    CheckCircle2,
    ArrowUpRight,
    MessageSquare,
    Headset,
    ChevronRight,
} from 'lucide-react'
import PageTitle from '../../components/shared/PageTitle'

const stats = [
    { label: 'Total de chamados', value: 12, icon: Ticket, color: 'text-primary', bg: 'bg-purple-50' },
    { label: 'Abertos', value: 3, icon: Clock3, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Em atendimento', value: 2, icon: Headset, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Finalizados', value: 7, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
]

const recentTickets = [
    { id: 1024, subject: 'Computador lento', category: 'Hardware', date: '10/11/2026', status: 'Em atendimento', priority: 'Alta' },
    { id: 1023, subject: 'Erro ao acessar sistema', category: 'Software', date: '09/11/2026', status: 'Aberto', priority: 'Média' },
    { id: 1022, subject: 'Problema com impressora', category: 'Impressora', date: '08/11/2026', status: 'Finalizado', priority: 'Baixa' },
]

const updates = [
    { id: 1, title: 'O técnico adicionou uma observação', ticket: '#1024', time: 'Hoje, às 14:30', icon: MessageSquare },
    { id: 2, title: 'Seu chamado foi finalizado', ticket: '#1022', time: 'Ontem, às 16:45', icon: CheckCircle2 },
]

const statusStyle: Record<string, string> = {
    'Aberto': 'bg-blue-50 text-blue-700',
    'Em atendimento': 'bg-amber-50 text-amber-700',
    'Finalizado': 'bg-green-50 text-green-700',
}

const priorityStyle: Record<string, string> = {
    Alta: 'text-red-600',
    Média: 'text-orange-600',
    Baixa: 'text-gray-500',
}

function Dashboard() {
    return (
        <div className="space-y-7">
            <PageTitle
                title="Visão geral"
                description="Acompanhe suas solicitações de suporte."
            />

            <section className="flex flex-col justify-between gap-4 rounded-lg bg-primary p-6 text-white sm:flex-row sm:items-center">
                <div>
                    <h3 className="text-lg font-semibold">Precisa de ajuda?</h3>
                    <p className="mt-1 max-w-lg text-sm text-purple-100">
                        Abra um chamado e nossa equipe irá ajudar a resolver seu problema.
                    </p>
                </div>
                <Link
                    to="/chamados/novo"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-purple-50"
                >
                    <Plus size={17} />
                    Novo chamado
                </Link>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">{stat.label}</span>
                                <div className={`rounded-md p-2 ${stat.bg}`}>
                                    <Icon size={18} className={stat.color} />
                                </div>
                            </div>
                            <p className="mt-4 text-2xl font-semibold text-foreground">{stat.value}</p>
                        </div>
                    )
                })}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <div>
                            <h3 className="font-semibold text-foreground">Chamados recentes</h3>
                            <p className="mt-1 text-xs text-gray-500">Acompanhe suas últimas solicitações.</p>
                        </div>
                        <Link to="/chamados" className="text-sm font-medium text-primary hover:text-primary-dark">
                            Ver todos
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {recentTickets.map((ticket) => (
                            <Link
                                key={ticket.id}
                                to={`/chamados/${ticket.id}`}
                                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="min-w-0">
                                    <p className="text-xs text-gray-400">#{ticket.id} · {ticket.category}</p>
                                    <p className="mt-1 truncate text-sm font-medium text-foreground">{ticket.subject}</p>
                                    <p className="mt-1 text-xs text-gray-400">{ticket.date}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[ticket.status]}`}>
                                        {ticket.status}
                                    </span>
                                    <span className={`text-xs font-medium ${priorityStyle[ticket.priority]}`}>
                                        {ticket.priority}
                                    </span>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white">
                    <div className="border-b border-gray-100 px-5 py-4">
                        <h3 className="font-semibold text-foreground">Últimas atualizações</h3>
                        <p className="mt-1 text-xs text-gray-500">Novidades sobre seus chamados.</p>
                    </div>
                    <div className="space-y-5 p-5">
                        {updates.map((update) => {
                            const Icon = update.icon
                            return (
                                <div key={update.id} className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50 text-primary">
                                        <Icon size={17} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{update.title}</p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Chamado {update.ticket} · {update.time}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="border-t border-gray-100 px-5 py-3">
                        <Link to="/chamados" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark">
                            Consultar meus chamados <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
