import type { ComponentBaseProps } from '../types'

export type ScaleIconProps = ComponentBaseProps & {
  size?: number
  onClick?: (() => void) | undefined
}
