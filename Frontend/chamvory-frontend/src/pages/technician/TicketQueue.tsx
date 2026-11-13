import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../../components/shared/PageTitle'
import { api, errorMessage, type ApiTicket, priorityLabel } from '../../services/api'

export default function TicketQueue() {
  const [tickets, setTickets] = useState<ApiTicket[]>([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [query, setQuery] = useState('')
  const load = () => api.get<{ chamados: ApiTicket[] }>('/tickets').then(r=>setTickets(r.data.chamados.filter(t=>t.status==='ABERTO' && !t.tecnico_id))).catch(e=>setError(errorMessage(e)))
  useEffect(()=>{ void load() },[])
  async function assign(id: number) { try { await api.patch(`/tickets/${id}/assign`); setMessage('Chamado assumido com sucesso.'); await load() } catch(e) { setError(errorMessage(e)) } }
  const visible = tickets.filter(t=>`${t.numero} ${t.assunto} ${t.solicitante_nome}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="space-y-6"><PageTitle title="Fila de chamados" description="Chamados abertos disponíveis para atendimento."/>{message&&<p role="status" className="rounded bg-green-50 p-3 text-sm text-green-700">{message}</p>}{error&&<p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por assunto, número ou solicitante" className="h-10 w-full rounded-lg border bg-white px-3 text-sm"/>
    <section className="divide-y rounded-xl border bg-white">{visible.map(t=><article key={t.id} className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"><div><p className="text-xs text-gray-500">{t.numero} · {t.categoria_nome} · {priorityLabel(t.prioridade)}</p><h2 className="mt-1 font-semibold">{t.assunto}</h2><p className="mt-1 text-sm text-gray-600">{t.descricao}</p><p className="mt-2 text-xs text-gray-500">Solicitante: {t.solicitante_nome} · {new Date(t.data_abertura).toLocaleString('pt-BR')}</p></div><div className="flex gap-2"><Link to={`/tecnico/atendimento/${t.id}`} className="rounded border px-3 py-2 text-sm">Detalhes</Link><button onClick={()=>void assign(t.id)} className="rounded bg-primary px-3 py-2 text-sm text-white">Assumir chamado</button></div></article>)}{!visible.length&&<p className="p-10 text-center text-sm text-gray-500">Não há chamados disponíveis na fila.</p>}</section>
  </div>
}
