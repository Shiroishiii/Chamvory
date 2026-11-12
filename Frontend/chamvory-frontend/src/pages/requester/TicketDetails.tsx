
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    Pencil,
    Trash2,
    UserRound,
    MessageSquare,
    AlertCircle,
} from 'lucide-react'
import PageTitle from '../../components/shared/PageTitle'

type TicketStatus = 'Aberto' | 'Em atendimento' | 'Finalizado'
type TicketPriority = 'Baixa' | 'Média' | 'Alta'

interface HistoryItem {
    id: number
    author: string
    date: string
    description: string
    status: TicketStatus
}

interface TicketData {
    id: number
    subject: string
    description: string
    category: string
    priority: TicketPriority
    status: TicketStatus
    openingDate: string
    requester: string
    technician: string | null
    history: HistoryItem[]
}

const mockTicket: TicketData = {
    id: 1024,
    subject: 'Problema ao acessar o sistema',
    description:
        'Estou tentando acessar o sistema desde o início da manhã, mas aparece uma mensagem informando que não foi possível autenticar minha conta. Já tentei redefinir a senha, porém o problema continua acontecendo.',
    category: 'Acesso e login',
    priority: 'Alta',
    status: 'Em atendimento',
    openingDate: '10/11/2026 às 08:30',
    requester: 'João da Silva',
    technician: 'Carlos Oliveira',
    history: [
        {
            id: 1,
            author: 'João da Silva',
            date: '10/11/2026 às 08:30',
            description: 'Chamado registrado pelo solicitante.',
            status: 'Aberto',
        },
        {
            id: 2,
            author: 'Carlos Oliveira',
            date: '10/11/2026 às 09:15',
            description:
                'Assumi o atendimento e iniciei a análise do problema de autenticação.',
            status: 'Em atendimento',
        },
    ],
}

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

function TicketDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [ticket, setTicket] = useState<TicketData>({
        ...mockTicket,
        id: Number(id) || mockTicket.id,
    })

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // O solicitante só pode editar chamados abertos.
    const canEdit = ticket.status === 'Aberto'

    // A exclusão também exige que não exista histórico.
    const canDelete = canEdit && ticket.history.length === 0

    function handleDelete() {
        // TODO: substituir pela requisição DELETE da API.
        setShowDeleteModal(false)

        navigate('/chamados', {
            state: { success: 'Chamado excluído com sucesso.' },
        })
    }

    return (
        <div>
            <div className="mb-5">
                <Link
                    to="/chamados"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#777386] transition hover:text-primary"
                >
                    <ArrowLeft size={17} />
                    Voltar para meus chamados
                </Link>
            </div>

            <PageTitle
                title={`Chamado #${ticket.id}`}
                description="Consulte os detalhes e acompanhe o andamento da solicitação."
                action={
                    canEdit ? (
                        <Link
                            to={`/chamados/${ticket.id}/editar`}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E5E4EB] bg-white px-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
                        >
                            <Pencil size={16} />
                            Editar
                        </Link>
                    ) : undefined
                }
            />

            {/* Informações principais */}
            <section className="rounded-xl border border-[#EAE9EF] bg-white p-5 sm:p-7">
                <div className="flex flex-col justify-between gap-4 border-b border-[#F0EFF3] pb-5 sm:flex-row sm:items-start">
                    <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
                            Assunto do chamado
                        </p>

                        <h2 className="text-lg font-semibold text-foreground">
                            {ticket.subject}
                        </h2>
                    </div>

                    <span
                        className={`inline-flex w-fit rounded-md px-3 py-1.5 text-xs font-medium ${statusStyles[ticket.status]}`}
                    >
                        {ticket.status}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-5 border-b border-[#F0EFF3] py-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="mb-1 text-xs text-[#9CA3AF]">Categoria</p>
                        <p className="text-sm font-medium text-foreground">
                            {ticket.category}
                        </p>
                    </div>

                    <div>
                        <p className="mb-1 text-xs text-[#9CA3AF]">Prioridade</p>
                        <p className={`text-sm font-medium ${priorityStyles[ticket.priority]}`}>
                            {ticket.priority}
                        </p>
                    </div>

                    <div>
                        <p className="mb-1 text-xs text-[#9CA3AF]">Data de abertura</p>
                        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <CalendarDays size={15} className="text-[#9CA3AF]" />
                            {ticket.openingDate}
                        </p>
                    </div>

                    <div>
                        <p className="mb-1 text-xs text-[#9CA3AF]">Responsável</p>
                        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <UserRound size={15} className="text-[#9CA3AF]" />
                            {ticket.technician ?? 'Aguardando técnico'}
                        </p>
                    </div>
                </div>

                <div className="pt-5">
                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                        Descrição do problema
                    </h3>

                    <p className="whitespace-pre-wrap text-sm leading-7 text-[#777386]">
                        {ticket.description}
                    </p>
                </div>
            </section>

            {/* Histórico */}
            <section className="mt-6 rounded-xl border border-[#EAE9EF] bg-white p-5 sm:p-7">
                <div className="mb-6">
                    <h3 className="text-base font-semibold text-foreground">
                        Histórico de atendimento
                    </h3>

                    <p className="mt-1 text-sm text-[#9CA3AF]">
                        Acompanhe as atualizações realizadas neste chamado.
                    </p>
                </div>

                {ticket.history.length > 0 ? (
                    <div className="space-y-6">
                        {ticket.history.map((item, index) => (
                            <div key={item.id} className="relative flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3EEFF] text-primary">
                                        <MessageSquare size={17} />
                                    </div>

                                    {index !== ticket.history.length - 1 && (
                                        <div className="mt-2 h-full min-h-8 w-px bg-[#EAE9EF]" />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1 pb-2">
                                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                        <p className="text-sm font-semibold text-foreground">
                                            {item.author}
                                        </p>

                                        <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                                            <Clock3 size={13} />
                                            {item.date}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm leading-6 text-[#777386]">
                                        {item.description}
                                    </p>

                                    <span
                                        className={`mt-3 inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${statusStyles[item.status]}`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-[#9CA3AF]">
                        Nenhuma atualização registrada até o momento.
                    </p>
                )}
            </section>

            {/* Avisos e ações */}
            <section className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-[#EAE9EF] bg-white p-5 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3">
                    <AlertCircle size={19} className="mt-0.5 shrink-0 text-[#9CA3AF]" />

                    <div>
                        <p className="text-sm font-medium text-foreground">
                            {canEdit
                                ? 'Este chamado pode ser editado.'
                                : 'Este chamado não pode mais ser editado.'}
                        </p>

                        <p className="mt-1 text-xs text-[#9CA3AF]">
                            {canDelete
                                ? 'Você também pode excluir esta solicitação.'
                                : ticket.status === 'Aberto'
                                    ? 'A exclusão não está disponível porque existe histórico de atendimento.'
                                    : 'Somente chamados abertos podem ser alterados pelo solicitante.'}
                        </p>
                    </div>
                </div>

                {canDelete && (
                    <button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-red-100 px-4 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:self-auto"
                    >
                        <Trash2 size={16} />
                        Excluir chamado
                    </button>
                )}
            </section>

            {/* Confirmação de exclusão */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                    >
                        <h3
                            id="delete-title"
                            className="text-lg font-semibold text-foreground"
                        >
                            Excluir chamado?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#777386]">
                            Tem certeza de que deseja excluir o chamado #{ticket.id}?
                            Essa ação não poderá ser desfeita.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="h-10 rounded-lg border border-[#E5E4EB] px-4 text-sm font-medium text-[#777386] hover:bg-background"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="h-10 rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition hover:bg-red-700"
                            >
                                Confirmar exclusão
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TicketDetail
