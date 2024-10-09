import type { CSSObject } from '@mui/system'

import type { ComponentBaseProps } from '../../types'

export type MenuIconProps = ComponentBaseProps & {
  active?: boolean | undefined
  width?: number | undefined
  height?: number | undefined
  color?: CSSObject['color']
  onClick?: ((active: boolean) => void) | undefined
}
