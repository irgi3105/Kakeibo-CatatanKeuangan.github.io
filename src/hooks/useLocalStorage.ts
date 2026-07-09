import { useEffect, useState } from 'react'

/**
 * Hook generik untuk menyimpan dan membaca state dari localStorage,
 * sehingga data tetap ada meski halaman di-refresh (tanpa backend).
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch (error) {
      console.error(`Gagal membaca localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Gagal menulis localStorage key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue] as const
}
