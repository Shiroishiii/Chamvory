
import { Link } from 'react-router-dom'
import {
    Ticket,
    CheckCircle2,
    AlertTriangle,
    ArrowUpRight,
    ChevronRight,
    ClipboardList,
    Headset,
} from 'lucide-react'
import PageTitle from '../../components/shared/PageTitle'

const stats = [
    { label: 'Na fila de atendimento', value: 12, description: 'Aguardando técnico', icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Meus atendimentos', value: 5, description: 'Em andamento', icon: Headset, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Finalizados hoje', value: 8, description: 'Concluídos por você', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Prioridade alta', value: 3, description: 'Na fila de atendimento', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
]

const priorityTickets = [
    { id: 1042, subject: 'Computador não inicia', category: 'Hardware', requester: 'Mariana Costa', date: 'Hoje, 09:20', priority: 'Alta' },
    { id: 1040, subject: 'Sem acesso ao sistema', category: 'Acesso', requester: 'Pedro Henrique', date: 'Hoje, 07:45', priority: 'Alta' },
    { id: 1038, subject: 'Impressora sem conexão', category: 'Impressora', requester: 'Ana Clara', date: 'Ontem, 15:10', priority: 'Média' },
]

const myAttendances = [
    { id: 1035, subject: 'Erro no aplicativo', requester: 'Lucas Martins', status: 'Em atendimento', date: 'Hoje, 10:30' },
    { id: 1032, subject: 'Falha na conexão de rede', requester: 'Camila Souza', status: 'Em atendimento', date: 'Ontem, 16:15' },
    { id: 1029, subject: 'Configuração de impressora', requester: 'Rafael Lima', status: 'Finalizado', date: 'Hoje, 11:40' },
]

const priorityStyle: Record<string, string> = {
    Alta: 'bg-red-50 text-red-700',
    Média: 'bg-amber-50 text-amber-700',
    Baixa: 'bg-gray-100 text-gray-600',
}

function TechnicianDashboard() {
    return (
        <div className="space-y-7">
            <PageTitle
                title="Painel do técnico"
                description="Gerencie a fila e acompanhe seus atendimentos."
                action={
                    <Link
                        to="/tecnico/fila"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
                    >
                        <ClipboardList size={17} />
                        Abrir fila
                    </Link>
                }
            />

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
                            <p className="mt-1 text-xs text-gray-400">{stat.description}</p>
                        </div>
                    )
                })}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <div>
                            <h3 className="font-semibold text-foreground">Chamados prioritários</h3>
                            <p className="mt-1 text-xs text-gray-500">Solicitações que precisam de atenção.</p>
                        </div>
                        <Link to="/tecnico/fila" className="text-sm font-medium text-primary hover:text-primary-dark">
                            Ver fila
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {priorityTickets.map((ticket) => (
                            <Link
                                key={ticket.id}
                                to={`/tecnico/atendimento/${ticket.id}`}
                                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="min-w-0">
                                    <p className="text-xs text-gray-400">#{ticket.id} · {ticket.category}</p>
                                    <p className="mt-1 truncate text-sm font-medium text-foreground">{ticket.subject}</p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {ticket.requester} · {ticket.date}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyle[ticket.priority]}`}>
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
                        <h3 className="font-semibold text-foreground">Resumo da fila</h3>
                        <p className="mt-1 text-xs text-gray-500">Distribuição dos chamados.</p>
                    </div>
                    <div className="space-y-5 p-5">
                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                                <span className="text-gray-600">Abertos</span>
                                <span className="font-medium text-foreground">12</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                <div className="h-full w-[60%] rounded-full bg-blue-500" />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                                <span className="text-gray-600">Em atendimento</span>
                                <span className="font-medium text-foreground">5</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                <div className="h-full w-[25%] rounded-full bg-amber-500" />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 flex justify-between text-sm">
                                <span className="text-gray-600">Finalizados hoje</span>
                                <span className="font-medium text-foreground">8</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                <div className="h-full w-[40%] rounded-full bg-green-500" />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 px-5 py-3">
                        <Link to="/tecnico/fila" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark">
                            Gerenciar fila <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <div>
                        <h3 className="font-semibold text-foreground">Meus atendimentos</h3>
                        <p className="mt-1 text-xs text-gray-500">Chamados sob sua responsabilidade.</p>
                    </div>
                    <Link to="/tecnico/atendimentos" className="text-sm font-medium text-primary hover:text-primary-dark">
                        Ver todos
                    </Link>
                </div>

                <div className="divide-y divide-gray-100">
                    {myAttendances.map((ticket) => (
                        <Link
                            key={ticket.id}
                            to={`/tecnico/atendimento/${ticket.id}`}
                            className="flex flex-col gap-2 px-5 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="text-xs text-gray-400">#{ticket.id} · {ticket.date}</p>
                                <p className="mt-1 text-sm font-medium text-foreground">{ticket.subject}</p>
                                <p className="mt-1 text-xs text-gray-500">Solicitante: {ticket.requester}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${ticket.status === 'Finalizado'
                                        ? 'bg-green-50 text-green-700'
                                        : 'bg-amber-50 text-amber-700'
                                    }`}>
                                    {ticket.status}
                                </span>
                                <ChevronRight size={16} className="text-gray-400" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default TechnicianDashboard
