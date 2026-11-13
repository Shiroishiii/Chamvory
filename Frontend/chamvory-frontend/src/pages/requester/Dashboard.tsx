import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, errorMessage, type ApiTicket, statusLabel } from '../../services/api'
import PageTitle from '../../components/shared/PageTitle'

export default function Dashboard() {
  const [summary, setSummary] = useState<Record<string, number>>({ ABERTO: 0, EM_ATENDIMENTO: 0, FINALIZADO: 0 })
  const [recent, setRecent] = useState<ApiTicket[]>([])
  const [error, setError] = useState('')
  useEffect(() => { Promise.all([api.get('/dashboard'), api.get('/tickets')]).then(([s, t]) => { setSummary(s.data.resumo); setRecent(t.data.chamados.slice(-5).reverse()) }).catch(e => setError(errorMessage(e))) }, [])
  return <div className="space-y-6"><PageTitle title="Visão geral" description="Acompanhe suas solicitações de suporte."/><section className="flex items-center justify-between gap-4 rounded-xl bg-primary p-6 text-white"><div><h2 className="text-lg font-semibold">Precisa de ajuda?</h2><p className="mt-1 text-sm text-white/80">Abra um chamado para falar com a equipe.</p></div><Link className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary" to="/chamados/novo">Novo chamado</Link></section>
    {error && <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}<section className="grid gap-4 sm:grid-cols-3">{[['Abertos',summary.ABERTO],['Em atendimento',summary.EM_ATENDIMENTO],['Finalizados',summary.FINALIZADO]].map(([label,value])=><div key={label} className="rounded-xl border bg-white p-5"><p className="text-sm text-gray-500">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div>)}</section>
    <section className="rounded-xl border bg-white p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Chamados recentes</h2><Link to="/chamados" className="text-sm text-primary">Ver todos</Link></div>{recent.length ? <div className="divide-y">{recent.map(t=><Link key={t.id} to={`/chamados/${t.id}`} className="flex justify-between gap-3 py-3 text-sm"><span>{t.numero} · {t.assunto}</span><span className="text-gray-500">{statusLabel(t.status)}</span></Link>)}</div> : <p className="text-sm text-gray-500">Nenhum chamado cadastrado.</p>}</section>
  </div>
}
