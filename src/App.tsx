
import { useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import SummaryPanel from './components/SummaryPanel'
import FilterBar from './components/FilterBar'
import TransactionList from './components/TransactionList'
import TransactionForm from './components/TransactionForm'
import BudgetTracker from './components/BudgetTracker'
import TrendChart from './components/TrendChart'
import Toast from './components/Toast'
import { useLocalStorage } from './hooks/useLocalStorage'
import { SortOption, Transaction, TransactionType } from './types'
import { formatTanggal } from './utils/format'

const STORAGE_KEY = 'kakeibo-transactions'
const BUDGET_KEY = 'kakeibo-budget'

function seedData(): Transaction[] {
  return [
    {
      id: crypto.randomUUID(),
      type: 'income',
      amount: 4500000,
      category: 'Gaji',
      note: 'Gaji bulanan',
      date: new Date().toISOString().slice(0, 10),
      createdAt: Date.now() - 3000,
    },
    {
      id: crypto.randomUUID(),
      type: 'expense',
      amount: 35000,
      category: 'Makanan & Minuman',
      note: 'Makan siang di warteg',
      date: new Date().toISOString().slice(0, 10),
      createdAt: Date.now() - 2000,
    },
    {
      id: crypto.randomUUID(),
      type: 'expense',
      amount: 150000,
      category: 'Transportasi',
      note: 'Isi bensin motor',
      date: new Date().toISOString().slice(0, 10),
      createdAt: Date.now() - 1000,
    },
  ]
}

export default function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    STORAGE_KEY,
    seedData(),
  )

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sort, setSort] = useState<SortOption>('newest')

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  const [budget, setBudget] = useLocalStorage<number>(BUDGET_KEY, 0)

  const [toast, setToast] = useState<{ message: string; undo?: () => void } | null>(null)
  const pendingDelete = useRef<Transaction | null>(null)

  const filtered = useMemo(() => {
    let result = [...transactions]

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (t) =>
          t.note.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      )
    }

    if (typeFilter !== 'all') {
      result = result.filter((t) => t.type === typeFilter)
    }

    if (categoryFilter !== 'all') {
      result = result.filter((t) => t.category === categoryFilter)
    }

    switch (sort) {
      case 'newest':
        result.sort((a, b) => b.createdAt - a.createdAt)
        break
      case 'oldest':
        result.sort((a, b) => a.createdAt - b.createdAt)
        break
      case 'amount-desc':
        result.sort((a, b) => b.amount - a.amount)
        break
      case 'amount-asc':
        result.sort((a, b) => a.amount - b.amount)
        break
    }

    return result
  }, [transactions, search, typeFilter, categoryFilter, sort])

  function handleAdd() {
    setEditing(null)
    setShowForm(true)
  }

  function handleEdit(t: Transaction) {
    setEditing(t)
    setShowForm(true)
  }

  function handleDelete(id: string) {
    const target = transactions.find((t) => t.id === id) ?? null
    pendingDelete.current = target
    setTransactions((prev) => prev.filter((t) => t.id !== id))
    setToast({
      message: target
        ? `Transaksi "${target.note}" (${formatTanggal(target.date)}) dihapus.`
        : 'Transaksi dihapus.',
      undo: () => {
        if (pendingDelete.current) {
          setTransactions((prev) => [...prev, pendingDelete.current!])
          pendingDelete.current = null
        }
      },
    })
  }

  function handleSave(data: Omit<Transaction, 'id' | 'createdAt'>) {
    if (editing) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editing.id ? { ...t, ...data } : t)),
      )
    } else {
      setTransactions((prev) => [
        ...prev,
        { ...data, id: crypto.randomUUID(), createdAt: Date.now() },
      ])
    }
    setShowForm(false)
    setEditing(null)
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-10 md:py-12 max-w-5xl mx-auto">
      <Header />

      <div className="grid md:grid-cols-[280px_1px_1fr] gap-6">
        <aside>
          <SummaryPanel transactions={transactions} />
          <div className="no-print">
            <BudgetTracker transactions={transactions} budget={budget} onSetBudget={setBudget} />
            <TrendChart transactions={transactions} />
          </div>
        </aside>

        <div className="hidden md:block tear-line no-print" />

        <main>
          <div className="flex justify-between items-center mb-4">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-sumi/50">
              Daftar Transaksi ({filtered.length})
            </p>
            <div className="flex gap-2 no-print">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-sumi text-sumi font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-sumi/10"
              >
                Cetak Laporan
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-sumi text-washi font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-sumi/80"
              >
                + Tambah Transaksi
              </button>
            </div>
          </div>

          <div className="no-print">
            <FilterBar
              search={search}
              onSearch={setSearch}
              typeFilter={typeFilter}
              onTypeFilter={setTypeFilter}
              categoryFilter={categoryFilter}
              onCategoryFilter={setCategoryFilter}
              sort={sort}
              onSort={setSort}
            />
          </div>

          <TransactionList
            transactions={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {showForm && (
        <TransactionForm
          initial={editing}
          onCancel={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSave={handleSave}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          actionLabel={toast.undo ? 'Urungkan' : undefined}
          onAction={toast.undo}
          onDismiss={() => setToast(null)}
        />
      )}

      <footer className="mt-12 pt-4 border-t border-kraft text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sumi/40">
          Kakeibo · Praktikum Pemrograman Web · UIR
        </p>
      </footer>
    </div>
  )
}
