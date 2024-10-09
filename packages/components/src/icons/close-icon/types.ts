import type { ComponentBaseProps } from '../../types'

export type CloseIconProps = ComponentBaseProps & {
  size?: number
  onClick?: (() => void) | undefined
}
