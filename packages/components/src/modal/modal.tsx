import { Modal as MuiModal } from '@mui/base'
import type { BaseSyntheticEvent } from 'react'
import { forwardRef } from 'react'

import { ModalContent, Root } from './styles'
import type { ModalProps } from './types'

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({ children, open, className, onClose }, ref) => {
  const backDropClick = (event: BaseSyntheticEvent) => {
    if ((event.target as HTMLDivElement).dataset?.modal === 'true') {
      onClose?.(event, 'backdropClick')
    }
  }

  if (!open) {
    return null
  }

  return (
    <Root ref={ref} data-modal="true" data-testid="modal" onClick={backDropClick}>
      <MuiModal className={className} closeAfterTransition disablePortal hideBackdrop open={open}>
        <ModalContent tabIndex={-1}>{children}</ModalContent>
      </MuiModal>
    </Root>
  )
})
