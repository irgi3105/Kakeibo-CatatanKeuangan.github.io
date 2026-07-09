import { useEffect } from 'react'

interface Props {
  message: string
  actionLabel?: string
  onAction?: () => void
  onDismiss: () => void
}

export default function Toast({ message, actionLabel, onAction, onDismiss }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-sumi text-washi px-4 py-3 rounded-sm shadow-lg flex items-center gap-4 border border-sumi/50">
      <span className="font-body text-sm">{message}</span>
      {actionLabel && onAction && (
        <button
          onClick={() => {
            onAction()
            onDismiss()
          }}
          className="font-mono text-xs uppercase tracking-wider text-ai underline underline-offset-2 shrink-0"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
