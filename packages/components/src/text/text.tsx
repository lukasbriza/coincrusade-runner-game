import { forwardRef } from 'react'

import { Root } from './styles'
import type { TextProps } from './types'

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { children, className, fontSize, fontWeight, lineHeight, variant = 'M', ...props },
  ref,
) {
  return (
    <Root
      {...props}
      ref={ref}
      className={className as string}
      ownerState={{ fontSize, fontWeight, lineHeight }}
      variant={variant as unknown as never}
    >
      {children}
    </Root>
  )
})
