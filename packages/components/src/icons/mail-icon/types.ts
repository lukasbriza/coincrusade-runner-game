import type { ComponentBaseProps } from '../../types'

export type MailIconProps = ComponentBaseProps & {
  size?: number
  onClick?: (() => void) | undefined
}
