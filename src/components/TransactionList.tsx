import { Transaction } from '../types'
import TransactionRow from './TransactionRow'

interface Props {
  transactions: Transaction[]
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}

export default function TransactionList({ transactions, onEdit, onDelete }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-kraft rounded-sm">
        <p className="font-display text-xl text-sumi/50 mb-1">
          Halaman ini masih kosong
        </p>
        <p className="font-body text-sm text-sumi/40">
          Belum ada transaksi yang cocok. Coba ubah filter atau tambahkan catatan baru.
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-kraft/60">
      {transactions.map((t) => (
        <TransactionRow key={t.id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
