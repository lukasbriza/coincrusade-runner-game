import type { ComponentBaseProps } from '../types'

export type KeyboardKeyProps = ComponentBaseProps & {
  width?: number | undefined
  isActive?: boolean | undefined
  activeColor?: string | undefined
  activeColorSecondary?: string | undefined
}
