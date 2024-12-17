import { forwardRef } from 'react'

import { Root, Text, Underliner } from './styles'
import type { MenuItemProps } from './types'

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ fontSize, text, onClick, active = false, color, ...restProps }, ref) => (
    <Root ref={ref} {...restProps} data-testid="menuitem" tabIndex={0}>
      <Text ownerState={{ fontSize, color }} variant="h2" onClick={onClick}>
        {text}
      </Text>
      <Underliner ownerState={{ active, color }} />
    </Root>
  ),
)
