import { useMemo } from 'react'
import { Transaction } from '../types'
import { formatRupiah } from '../utils/format'

interface Props {
  transactions: Transaction[]
}

export default function TrendChart({ transactions }: Props) {
  const days = useMemo(() => {
    const result: { label: string; net: number; date: string }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const iso = d.toISOString().slice(0, 10)
      const net = transactions
        .filter((t) => t.date === iso)
        .reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0)
      result.push({
        label: new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(d),
        net,
        date: iso,
      })
    }
    return result
  }, [transactions])

  const maxAbs = Math.max(1, ...days.map((d) => Math.abs(d.net)))

  return (
    <div className="border border-kraft rounded-sm p-4 mt-4 bg-washi-dark/40">
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-sumi/50 mb-3">
        Arus Kas 7 Hari Terakhir
      </p>
      <div className="flex items-end justify-between h-24 gap-1.5">
        {days.map((d) => {
          const h = Math.max(2, (Math.abs(d.net) / maxAbs) * 40)
          const positive = d.net >= 0
          return (
            <div key={d.date} className="flex-1 flex flex-col items-center justify-end h-full">
              <div className="flex-1 flex flex-col justify-end w-full items-center">
                {positive && (
                  <div
                    title={formatRupiah(d.net)}
                    className="w-3.5 bg-ai rounded-t-sm"
                    style={{ height: `${h}px` }}
                  />
                )}
              </div>
              <div className="w-full border-t border-sumi/30" />
              <div className="flex-1 flex flex-col justify-start w-full items-center">
                {!positive && (
                  <div
                    title={formatRupiah(d.net)}
                    className="w-3.5 bg-hanko rounded-b-sm"
                    style={{ height: `${h}px` }}
                  />
                )}
              </div>
              <span className="font-mono text-[9px] text-sumi/40 mt-1 uppercase">
                {d.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
