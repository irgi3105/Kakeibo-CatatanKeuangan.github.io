export default function Header() {
  return (
    <header className="relative border-b-2 border-sumi/80 pb-4 mb-6">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-ai uppercase mb-1">
            家計簿 · Buku Kas Harian
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-sumi tracking-tight">
            Kakeibo
          </h1>
        </div>
        <p className="font-body text-sm text-sumi/60 max-w-xs text-right hidden sm:block">
          Catat setiap pemasukan &amp; pengeluaran seperti menulis buku kas —
          jujur, tenang, dan jelas.
        </p>
      </div>
    </header>
  )
}
