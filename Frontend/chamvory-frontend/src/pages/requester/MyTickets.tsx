import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import PageTitle from '../../components/shared/PageTitle'
import { api, errorMessage, type ApiTicket, priorityLabel, statusLabel } from '../../services/api'

export default function MyTickets() {
  const [tickets, setTickets] = useState<ApiTicket[]>([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos')
  const [error, setError] = useState('')
  const success = useLocation().state?.success as string | undefined
  useEffect(() => { api.get<{ chamados: ApiTicket[] }>('/tickets').then(r => setTickets(r.data.chamados)).catch(e => setError(errorMessage(e))) }, [])
  const filtered = useMemo(() => tickets.filter(t => (`${t.numero} ${t.assunto}`).toLowerCase().includes(search.toLowerCase()) && (status === 'Todos' || statusLabel(t.status) === status)), [tickets, search, status])
  return <div className="space-y-6"><PageTitle title="Meus chamados" description="Consulte e acompanhe suas solicitações." action={<Link to="/chamados/novo" className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm text-white"><Plus size={17}/>Novo chamado</Link>} />
    {success && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{success}</p>}{error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white"><div className="flex flex-col gap-3 border-b p-4 sm:flex-row"><div className="relative flex-1"><Search size={17} className="absolute left-3 top-3 text-gray-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar por assunto ou número" className="h-10 w-full rounded-lg border pl-9 pr-3 text-sm"/></div><select value={status} onChange={e=>setStatus(e.target.value)} className="h-10 rounded-lg border px-3 text-sm"><option>Todos</option><option>Aberto</option><option>Em atendimento</option><option>Finalizado</option></select></div>
      {filtered.length ? <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left"><thead><tr className="bg-gray-50 text-xs text-gray-500"><th className="p-4">Chamado</th><th className="p-4">Categoria</th><th className="p-4">Abertura</th><th className="p-4">Prioridade</th><th className="p-4">Status</th><th className="p-4">Ver</th></tr></thead><tbody>{filtered.map(t=><tr key={t.id} className="border-t text-sm"><td className="p-4"><b>{t.assunto}</b><div className="text-xs text-gray-500">{t.numero}</div></td><td className="p-4">{t.categoria_nome}</td><td className="p-4">{new Date(t.data_abertura).toLocaleDateString('pt-BR')}</td><td className="p-4">{priorityLabel(t.prioridade)}</td><td className="p-4">{statusLabel(t.status)}</td><td className="p-4"><Link className="text-primary" to={`/chamados/${t.id}`}>Detalhes</Link></td></tr>)}</tbody></table></div> : <p className="p-10 text-center text-sm text-gray-500">{error ? 'Não foi possível carregar os chamados.' : 'Nenhum chamado encontrado.'}</p>}
      <p className="border-t p-4 text-xs text-gray-500">Exibindo {filtered.length} de {tickets.length} chamados</p>
    </section></div>
}
