import { Transaction } from '../types'
import { formatRupiah, formatTanggal } from '../utils/format'

interface Props {
  transaction: Transaction
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}

export default function TransactionRow({ transaction: t, onEdit, onDelete }: Props) {
  const isIncome = t.type === 'income'

  return (
    <div className="flex items-center gap-4 py-3 group">
      {/* stamp */}
      <div
        className={`shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center rotate-[-6deg] ${
          isIncome ? 'border-ai text-ai' : 'border-hanko text-hanko'
        }`}
      >
        <span className="font-mono text-xs font-bold">
          {isIncome ? '入' : '出'}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-body text-sm text-sumi truncate">{t.note}</p>
        <p className="font-mono text-[11px] text-sumi/50 uppercase tracking-wide">
          {t.category} · {formatTanggal(t.date)}
        </p>
      </div>

      <p
        className={`font-mono text-sm font-semibold shrink-0 ${
          isIncome ? 'text-ai' : 'text-hanko'
        }`}
      >
        {isIncome ? '+' : '−'} {formatRupiah(t.amount)}
      </p>

      <div className="no-print flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(t)}
          aria-label="Ubah transaksi"
          className="px-2 py-1 font-mono text-[10px] uppercase border border-kraft rounded-sm hover:border-ai hover:text-ai"
        >
          Ubah
        </button>
        <button
          onClick={() => onDelete(t.id)}
          aria-label="Hapus transaksi"
          className="px-2 py-1 font-mono text-[10px] uppercase border border-kraft rounded-sm hover:border-hanko hover:text-hanko"
        >
          Hapus
        </button>
      </div>
    </div>
  )
}
