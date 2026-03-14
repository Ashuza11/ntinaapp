export type UserRole = 'LEARNER' | 'TEACHER' | 'REVIEWER' | 'ADMIN'
export type Language = 'SW' | 'RW' | 'FR' | 'EN'

export interface User {
  id: string
  email: string
  username: string
  displayName: string
  avatarUrl?: string
  role: UserRole
  preferredLang: Language
  points: number
  createdAt: string
  updatedAt: string
}
