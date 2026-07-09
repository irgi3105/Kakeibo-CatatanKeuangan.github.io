import { useEffect, useState } from 'react'
import { Transaction, TransactionType, categoriesFor } from '../types'
import { todayISO } from '../utils/format'

interface Props {
  initial?: Transaction | null
  onCancel: () => void
  onSave: (t: Omit<Transaction, 'id' | 'createdAt'>) => void
}

export default function TransactionForm({ initial, onCancel, onSave }: Props) {
  const [type, setType] = useState<TransactionType>(initial?.type ?? 'expense')
  const [amount, setAmount] = useState(initial ? String(initial.amount) : '')
  const [category, setCategory] = useState(
    initial?.category ?? categoriesFor('expense')[0],
  )
  const [note, setNote] = useState(initial?.note ?? '')
  const [date, setDate] = useState(initial?.date ?? todayISO())
  const [error, setError] = useState('')

  useEffect(() => {
    // reset category jika tipe berubah dan kategori lama tidak valid lagi
    const cats = categoriesFor(type)
    if (!cats.includes(category)) setCategory(cats[0])
  }, [type]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const numAmount = Number(amount)
    if (!numAmount || numAmount <= 0) {
      setError('Nominal harus lebih besar dari 0.')
      return
    }
    if (!note.trim()) {
      setError('Deskripsi tidak boleh kosong.')
      return
    }
    onSave({ type, amount: numAmount, category, note: note.trim(), date })
  }

  return (
    <div className="fixed inset-0 bg-sumi/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-washi border-2 border-sumi w-full max-w-md p-6 rounded-sm relative"
      >
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-sumi/50 mb-1">
          {initial ? 'Ubah Catatan' : 'Catatan Baru'}
        </p>
        <h2 className="font-display text-2xl mb-5">
          {initial ? 'Perbarui Transaksi' : 'Tambah Transaksi'}
        </h2>

        {/* Type toggle */}
        <div className="flex mb-4 border border-sumi/30 rounded-sm overflow-hidden">
          {(['expense', 'income'] as TransactionType[]).map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                type === t
                  ? t === 'income'
                    ? 'bg-ai text-washi'
                    : 'bg-hanko text-washi'
                  : 'bg-transparent text-sumi/60'
              }`}
            >
              {t === 'income' ? 'Pemasukan' : 'Pengeluaran'}
            </button>
          ))}
        </div>

        <label className="block mb-3">
          <span className="font-mono text-xs uppercase tracking-wider text-sumi/60">
            Nominal (Rp)
          </span>
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="50000"
            className="w-full mt-1 px-3 py-2 bg-washi border border-kraft rounded-sm font-mono focus:border-ai"
          />
        </label>

        <label className="block mb-3">
          <span className="font-mono text-xs uppercase tracking-wider text-sumi/60">
            Kategori
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-washi border border-kraft rounded-sm font-body focus:border-ai"
          >
            {categoriesFor(type).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-3">
          <span className="font-mono text-xs uppercase tracking-wider text-sumi/60">
            Deskripsi
          </span>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Misal: Makan siang di warteg"
            className="w-full mt-1 px-3 py-2 bg-washi border border-kraft rounded-sm font-body focus:border-ai"
          />
        </label>

        <label className="block mb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-sumi/60">
            Tanggal
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-washi border border-kraft rounded-sm font-body focus:border-ai"
          />
        </label>

        {error && (
          <p className="text-hanko text-xs font-body mb-3">{error}</p>
        )}

        <div className="flex gap-2 justify-end pt-2 border-t border-kraft">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-sumi/60 hover:text-sumi mt-3"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 font-mono text-xs uppercase tracking-wider bg-sumi text-washi rounded-sm mt-3 hover:bg-sumi/80"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  )
}
