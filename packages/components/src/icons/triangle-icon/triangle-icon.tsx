import { forwardRef } from 'react'

import { Root } from './styles'
import type { TriangleProps } from './types'

export const TriangleIcon = forwardRef<HTMLDivElement, TriangleProps>(({ size, ...restProps }, ref) => (
  <Root {...restProps} ref={ref} data-testid="triangleicon" ownerState={{ size }} />
))
