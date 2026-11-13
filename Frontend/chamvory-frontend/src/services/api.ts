import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('chamvory_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('chamvory_token')
    localStorage.removeItem('chamvory_user')
    if (!window.location.pathname.startsWith('/login')) window.location.assign('/login')
  }
  return Promise.reject(error)
})

export function errorMessage(error: unknown, fallback = 'Não foi possível concluir a operação.') {
  if (axios.isAxiosError(error)) return error.response?.data?.error?.message || error.message || fallback
  return error instanceof Error ? error.message : fallback
}

export type ApiUser = { id: number; nome: string; email: string; perfil: 'SOLICITANTE' | 'TECNICO' }
export type ApiTicket = {
  id: number; numero: string; assunto: string; descricao: string; prioridade: 'BAIXA' | 'MEDIA' | 'ALTA'
  status: 'ABERTO' | 'EM_ATENDIMENTO' | 'FINALIZADO'; solicitante_id: number; categoria_id: number
  tecnico_id: number | null; data_abertura: string; categoria_nome: string; solicitante_nome: string; tecnico_nome: string | null
}
export const statusLabel = (status: ApiTicket['status']) => ({ ABERTO: 'Aberto', EM_ATENDIMENTO: 'Em atendimento', FINALIZADO: 'Finalizado' })[status]
export const priorityLabel = (priority: ApiTicket['prioridade']) => ({ BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta' })[priority]
