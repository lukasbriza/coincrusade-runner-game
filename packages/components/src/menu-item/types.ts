import type { CSSObject } from '@mui/system'

import type { ComponentBaseProps } from '../types'

export type MenuItemProps = ComponentBaseProps & {
  text: string
  color?: CSSObject['color'] | undefined
  fontSize?: number | undefined
  active?: boolean
  onClick?: (() => void) | undefined
}
