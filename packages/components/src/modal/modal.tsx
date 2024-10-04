import { forwardRef } from 'react'

import { ModalContent, Root } from './styles'
import type { ModalProps } from './types'

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({ children, open, className, onClose }, ref) => (
  <Root
    className={className}
    closeAfterTransition
    disablePortal
    hideBackdrop
    open={open}
    slotProps={{
      root: {
        onClick: (event) => {
          if ((event.target as HTMLDivElement)?.classList.contains('base-Modal-root')) {
            onClose?.(event, 'backdropClick')
          }
        },
      },
    }}
    onClose={onClose as () => void}
  >
    <ModalContent ref={ref} tabIndex={-1}>
      {children}
    </ModalContent>
  </Root>
))
