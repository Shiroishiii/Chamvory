export const PERFIS = ['SOLICITANTE', 'TECNICO'] as const;
export type Perfil = (typeof PERFIS)[number];

export const STATUS = ['ABERTO', 'EM_ATENDIMENTO', 'FINALIZADO'] as const;
export type Status = (typeof STATUS)[number];

export const PRIORIDADES = ['BAIXA', 'MEDIA', 'ALTA'] as const;
export type Prioridade = (typeof PRIORIDADES)[number];

/** Usuário autenticado, extraído do token JWT já validado. */
export interface AuthUser {
  id: number;
  perfil: Perfil;
  jti: string;
  exp: number;
}

export interface PublicUser {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
}

export interface UserRow extends PublicUser {
  senha_hash: string;
}

export interface TicketRow {
  id: number;
  numero: string;
  assunto: string;
  descricao: string;
  prioridade: Prioridade;
  status: Status;
  solicitante_id: number;
  categoria_id: number;
  tecnico_id: number | null;
  data_abertura: Date;
  categoria_nome?: string;
  solicitante_nome?: string;
  tecnico_nome?: string | null;
}

export interface HistoryRow {
  id: number;
  chamado_id: number;
  tecnico_id: number;
  data_atendimento: Date;
  observacao: string;
  solucao: string | null;
  status_resultante: Status;
  tecnico_nome?: string;
}
