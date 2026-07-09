import { useMemo, useState } from 'react'
import { Transaction } from '../types'
import { formatRupiah } from '../utils/format'

interface Props {
  transactions: Transaction[]
  budget: number
  onSetBudget: (v: number) => void
}

export default function BudgetTracker({ transactions, budget, onSetBudget }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(budget || ''))

  const spentThisMonth = useMemo(() => {
    const now = new Date()
    const ym = now.toISOString().slice(0, 7) // yyyy-mm
    return transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(ym))
      .reduce((sum, t) => sum + t.amount, 0)
  }, [transactions])

  const pct = budget > 0 ? Math.min(100, Math.round((spentThisMonth / budget) * 100)) : 0
  const barColor = pct >= 100 ? 'bg-hanko' : pct >= 75 ? 'bg-[#B8863B]' : 'bg-moss'

  function save() {
    const n = Number(draft)
    onSetBudget(n > 0 ? n : 0)
    setEditing(false)
  }

  return (
    <div className="border border-kraft rounded-sm p-4 mt-4 bg-washi-dark/40">
      <div className="flex justify-between items-center mb-2">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-sumi/50">
          Target Hemat Bulan Ini
        </p>
        <button
          onClick={() => setEditing((v) => !v)}
          className="font-mono text-[10px] uppercase text-ai hover:underline"
        >
          {budget > 0 ? 'Ubah' : 'Atur'}
        </button>
      </div>

      {editing ? (
        <div className="flex gap-2">
          <input
            type="number"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Misal: 1500000"
            className="flex-1 px-2 py-1 bg-washi border border-kraft rounded-sm font-mono text-sm focus:border-ai"
          />
          <button
            onClick={save}
            className="px-3 py-1 bg-sumi text-washi font-mono text-[10px] uppercase rounded-sm"
          >
            Simpan
          </button>
        </div>
      ) : budget > 0 ? (
        <>
          <div className="flex justify-between font-mono text-xs mb-1">
            <span className="text-sumi/70">{formatRupiah(spentThisMonth)}</span>
            <span className="text-sumi/50">dari {formatRupiah(budget)}</span>
          </div>
          <div className="h-2.5 bg-kraft/40 rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} rounded-full transition-all`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="font-body text-xs text-sumi/50 mt-1">
            {pct >= 100
              ? 'Target sudah terlampaui bulan ini.'
              : `${pct}% dari target terpakai.`}
          </p>
        </>
      ) : (
        <p className="font-body text-xs text-sumi/40">
          Belum ada target. Sesuai semangat kakeibo, atur target hemat bulanan agar pengeluaran terkontrol.
        </p>
      )}
    </div>
  )
}
