import { useMemo } from 'react'
import { Transaction } from '../types'
import { formatRupiah } from '../utils/format'

interface Props {
  transactions: Transaction[]
}

export default function SummaryPanel({ transactions }: Props) {
  const { income, expense, balance, breakdown } = useMemo(() => {
    let income = 0
    let expense = 0
    const byCategory: Record<string, number> = {}

    for (const t of transactions) {
      if (t.type === 'income') income += t.amount
      else {
        expense += t.amount
        byCategory[t.category] = (byCategory[t.category] || 0) + t.amount
      }
    }

    const total = Object.values(byCategory).reduce((a, b) => a + b, 0) || 1
    const breakdown = Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, amount]) => ({
        category,
        amount,
        pct: Math.round((amount / total) * 100),
      }))

    return { income, expense, balance: income - expense, breakdown }
  }, [transactions])

  return (
    <div className="bg-washi-dark/60 border border-kraft rounded-sm p-6">
      {/* Hanko stamp balance */}
      <div className="flex flex-col items-center text-center mb-6">
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-sumi/50 mb-2">
          Saldo Saat Ini
        </span>
        <div
          key={balance}
          className={`stamp-anim inline-flex items-center justify-center w-40 h-40 rounded-full border-4 ${
            balance >= 0 ? 'border-ai text-ai' : 'border-hanko text-hanko'
          } rotate-[-4deg]`}
          style={{ boxShadow: 'inset 0 0 0 3px currentColor' }}
        >
          <span className="font-mono text-lg font-semibold px-2 leading-tight break-all">
            {formatRupiah(balance)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="border border-ai/40 rounded-sm p-3 bg-washi">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ai mb-1">
            Pemasukan
          </p>
          <p className="font-mono text-sm font-semibold text-ai break-all">
            {formatRupiah(income)}
          </p>
        </div>
        <div className="border border-hanko/40 rounded-sm p-3 bg-washi">
          <p className="font-mono text-[10px] uppercase tracking-wider text-hanko mb-1">
            Pengeluaran
          </p>
          <p className="font-mono text-sm font-semibold text-hanko break-all">
            {formatRupiah(expense)}
          </p>
        </div>
      </div>

      {breakdown.length > 0 && (
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-sumi/50 mb-3">
            Rincian Pengeluaran
          </p>
          <div className="space-y-2">
            {breakdown.map((b) => (
              <div key={b.category}>
                <div className="flex justify-between text-xs font-body mb-1">
                  <span className="text-sumi/80">{b.category}</span>
                  <span className="font-mono text-sumi/60">{b.pct}%</span>
                </div>
                <div className="h-2 bg-kraft/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-moss rounded-full"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
