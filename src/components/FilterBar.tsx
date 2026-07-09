import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  SortOption,
  TransactionType,
} from '../types'

interface Props {
  search: string
  onSearch: (v: string) => void
  typeFilter: TransactionType | 'all'
  onTypeFilter: (v: TransactionType | 'all') => void
  categoryFilter: string
  onCategoryFilter: (v: string) => void
  sort: SortOption
  onSort: (v: SortOption) => void
}

const ALL_CATEGORIES = Array.from(
  new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]),
)

export default function FilterBar({
  search,
  onSearch,
  typeFilter,
  onTypeFilter,
  categoryFilter,
  onCategoryFilter,
  sort,
  onSort,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Cari deskripsi..."
        className="flex-1 min-w-[160px] px-3 py-2 bg-washi border border-kraft rounded-sm font-body text-sm focus:border-ai"
      />

      <select
        value={typeFilter}
        onChange={(e) => onTypeFilter(e.target.value as TransactionType | 'all')}
        className="px-3 py-2 bg-washi border border-kraft rounded-sm font-mono text-xs uppercase tracking-wider focus:border-ai"
      >
        <option value="all">Semua Tipe</option>
        <option value="income">Pemasukan</option>
        <option value="expense">Pengeluaran</option>
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryFilter(e.target.value)}
        className="px-3 py-2 bg-washi border border-kraft rounded-sm font-body text-sm focus:border-ai"
      >
        <option value="all">Semua Kategori</option>
        {ALL_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as SortOption)}
        className="px-3 py-2 bg-washi border border-kraft rounded-sm font-mono text-xs uppercase tracking-wider focus:border-ai"
      >
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
        <option value="amount-desc">Nominal Tertinggi</option>
        <option value="amount-asc">Nominal Terendah</option>
      </select>
    </div>
  )
}
