
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Send } from 'lucide-react'
import PageTitle from '../../components/shared/PageTitle'
import { api, errorMessage } from '../../services/api'

function CreateTicket() {
    const navigate = useNavigate()

    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState('MEDIA')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState<{ id: number; nome: string }[]>([])
    useEffect(() => { api.get<{ categorias: { id: number; nome: string }[] }>('/categories').then(r => setCategories(r.data.categorias)).catch(e => setError(errorMessage(e))) }, [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError('')

        if (!subject.trim() || !description.trim() || !category) {
            setError('Preencha todos os campos obrigatórios.')
            return
        }

        if (subject.trim().length < 5) {
            setError('O assunto deve possuir pelo menos 5 caracteres.')
            return
        }

        if (description.trim().length < 10) {
            setError('A descrição deve possuir pelo menos 10 caracteres.')
            return
        }

        setLoading(true)

        try {
            await api.post('/tickets', { assunto: subject.trim(), descricao: description.trim(), categoria_id: Number(category), prioridade: priority })

            navigate('/chamados', {
                state: { success: 'Chamado criado com sucesso!' },
            })
        } catch (err) {
            setError(errorMessage(err, 'Não foi possível criar o chamado. Tente novamente.'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl">
            <PageTitle
                title="Novo chamado"
                description="Descreva seu problema para que nossa equipe possa ajudar."
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                <section className="rounded-xl border border-[#EAE9EF] bg-white p-5 sm:p-7">
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-foreground">
                            Informações do chamado
                        </h3>
                        <p className="mt-1 text-sm text-[#9CA3AF]">
                            Informe os detalhes da sua solicitação.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-foreground"
                            >
                                Assunto <span className="text-red-500">*</span>
                            </label>

                            <input
                                id="subject"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Ex.: Problema ao acessar o sistema"
                                maxLength={120}
                                className="h-11 w-full rounded-lg border border-[#E5E4EB] px-3 text-sm text-foreground outline-none transition placeholder:text-[#B0AEB9] focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />

                            <p className="text-right text-xs text-[#A5A2B0]">
                                {subject.length}/120
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-foreground"
                            >
                                Categoria <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="h-11 w-full rounded-lg border border-[#E5E4EB] bg-white px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="priority"
                                className="block text-sm font-medium text-foreground"
                            >
                                Prioridade <span className="text-red-500">*</span>
                            </label>

                            <select
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="h-11 w-full rounded-lg border border-[#E5E4EB] bg-white px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                            >
                                <option value="BAIXA">Baixa</option>
                                <option value="MEDIA">Média</option>
                                <option value="ALTA">Alta</option>
                            </select>

                            <p className="text-xs text-[#9CA3AF]">
                                Selecione a prioridade de acordo com o impacto do problema.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-foreground"
                                >
                                    Descrição <span className="text-red-500">*</span>
                                </label>

                                <span className="text-xs text-[#A5A2B0]">
                                    {description.length}/2000
                                </span>
                            </div>

                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descreva o problema, quando começou e quais tentativas de solução você já realizou..."
                                maxLength={2000}
                                rows={6}
                                className="w-full resize-y rounded-lg border border-[#E5E4EB] px-3 py-3 text-sm text-foreground outline-none transition placeholder:text-[#B0AEB9] focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />

                            <p className="text-xs text-[#9CA3AF]">
                                Forneça o máximo de informações possível para facilitar o atendimento.
                            </p>
                        </div>
                    </div>
                </section>

                {error && (
                    <div
                        role="alert"
                        className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                        {error}
                    </div>
                )}

                <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                    <Link
                        to="/chamados"
                        className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E5E4EB] bg-white px-5 text-sm font-medium text-[#777386] transition hover:bg-background hover:text-foreground"
                    >
                        Cancelar
                    </Link>

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Send size={16} />
                        {loading ? 'Enviando...' : 'Enviar chamado'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTicket
