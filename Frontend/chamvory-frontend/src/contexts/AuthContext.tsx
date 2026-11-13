import { useEffect, useState, type ReactNode } from 'react'
import { api, type ApiUser } from '../services/api'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(() => {
    try { return JSON.parse(localStorage.getItem('chamvory_user') || 'null') } catch { return null }
  })
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('chamvory_token')))
  useEffect(() => {
    if (!localStorage.getItem('chamvory_token')) return
    api.get<{ usuario: ApiUser }>('/auth/me').then(({ data }) => {
      setUser(data.usuario); localStorage.setItem('chamvory_user', JSON.stringify(data.usuario))
    }).catch(() => setUser(null)).finally(() => setLoading(false))
  }, [])
  async function login(email: string, senha: string) {
    const { data } = await api.post<{ token: string; usuario: ApiUser }>('/auth/login', { email, senha })
    localStorage.setItem('chamvory_token', data.token)
    localStorage.setItem('chamvory_user', JSON.stringify(data.usuario))
    setUser(data.usuario)
  }
  async function logout() {
    try { await api.post('/auth/logout') } finally {
      localStorage.removeItem('chamvory_token'); localStorage.removeItem('chamvory_user'); setUser(null)
    }
  }
  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}
