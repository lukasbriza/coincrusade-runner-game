/* eslint-disable react/jsx-props-no-spreading */
import type { FC } from 'react'

import { Root } from './styles'
import type { MainHeaderProps } from './types'

export const MainHeader: FC<MainHeaderProps> = ({ children, ...restProps }) => (
  <Root variant="h1" {...restProps}>
    {children}
  </Root>
)
