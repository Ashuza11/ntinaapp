import type { Language } from './user'

export type ContentStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'NEEDS_EDIT'
  | 'FLAGGED'
  | 'REJECTED'

export type ReviewVerdict = 'APPROVE' | 'NEEDS_EDIT' | 'FLAG'
export type Domain = 'STEM' | 'ECONOMICS' | 'ENVIRONMENT' | 'HISTORY' | 'OTHER'

export interface Concept {
  id: string
  slug: string
  domain: Domain
  termSw?: string
  termRw?: string
  termFr?: string
  termEn: string
  keyFacts: string[]
}

export interface Recording {
  id: string
  title: string
  audioUrl: string
  audioDuration: number
  language: Language
  status: ContentStatus
  localAnalogy?: string
  illustrationUrl?: string
  playCount: number
  teacher: { id: string; displayName: string; avatarUrl?: string }
  concept: Concept
  createdAt: string
  updatedAt: string
}
