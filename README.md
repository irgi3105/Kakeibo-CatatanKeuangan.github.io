# Kakeibo — Catatan Keuangan

Aplikasi pencatatan keuangan (income & expense tracker) bertema **kakeibo (家計簿)**,
metode buku kas rumah tangga tradisional Jepang. Dibangun dengan React + TypeScript +
Tailwind CSS, data disimpan di `localStorage` (tanpa backend).

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Untuk build production:

```bash
npm run build
npm run preview
```

## Fitur

- **Create** — tambah transaksi baru (pemasukan/pengeluaran) lewat form modal
- **Read** — daftar transaksi ditampilkan seperti baris buku kas
- **Update** — edit transaksi yang sudah ada
- **Delete** — hapus transaksi (dengan konfirmasi)
- **Search** — cari berdasarkan deskripsi/kategori
- **Filter** — filter berdasarkan tipe (pemasukan/pengeluaran) dan kategori,
  plus urutkan berdasarkan tanggal/nominal
- Ringkasan saldo bergaya "stempel hanko" + rincian pengeluaran per kategori
- Data persisten di `localStorage`, tetap ada setelah refresh
- **Target Anggaran Bulanan** — atur batas pengeluaran per bulan, progress bar berubah warna (hijau → kuning → merah) mendekati/melewati batas, sesuai praktik kakeibo asli
- **Grafik Arus Kas 7 Hari** — mini bar chart naik/turun gaya buku kas untuk melihat tren cepat
- **Cetak Laporan** — tombol untuk mencetak/export laporan transaksi sebagai PDF lewat dialog print browser
- **Undo Hapus** — toast konfirmasi 5 detik dengan tombol "Urungkan" setelah menghapus transaksi

## Struktur

```
src/
  types.ts               tipe data & daftar kategori
  hooks/useLocalStorage.ts   hook custom untuk persistensi
  utils/format.ts         format rupiah & tanggal
  components/
    Header.tsx
    SummaryPanel.tsx
    FilterBar.tsx
    TransactionForm.tsx
    TransactionList.tsx
    TransactionRow.tsx
  App.tsx                 state management utama (hooks: useState, useMemo)
```

## Konsep desain

Palet "washi paper" (krem) + tinta sumi (hitam kecoklatan), aksen merah hanko
(pengeluaran) dan indigo (pemasukan). Tipografi: Shippori Mincho (judul),
IBM Plex Sans (isi), IBM Plex Mono (nominal angka).
