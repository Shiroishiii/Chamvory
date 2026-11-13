import { createContext } from 'react'
import type { ApiUser } from '../services/api'

export type AuthContextValue = { user: ApiUser | null; loading: boolean; login: (email: string, senha: string) => Promise<void>; logout: () => Promise<void> }
export const AuthContext = createContext<AuthContextValue | null>(null)
