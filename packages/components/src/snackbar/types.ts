import type { ReactNode } from 'react'

export type SnackbarProps = {
  children: ReactNode
  autoHideDuration?: number
  onClose?: (id: string) => void
  id: string
}
