export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  category: string
  note: string
  date: string // yyyy-mm-dd
  createdAt: number
}

export const EXPENSE_CATEGORIES = [
  'Makanan & Minuman',
  'Transportasi',
  'Belanja',
  'Tagihan',
  'Hiburan',
  'Kesehatan',
  'Pendidikan',
  'Lainnya',
] as const

export const INCOME_CATEGORIES = [
  'Gaji',
  'Uang Jajan',
  'Bonus',
  'Investasi',
  'Hadiah',
  'Lainnya',
] as const

export function categoriesFor(type: TransactionType): readonly string[] {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
}

export type SortOption = 'newest' | 'oldest' | 'amount-desc' | 'amount-asc'
