export type ModalProps = {
  children: JSX.Element
  open: boolean
  className?: string | undefined
  onClose?: ((event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined
}
