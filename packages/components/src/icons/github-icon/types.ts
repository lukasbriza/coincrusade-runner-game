import type { ComponentBaseProps } from '../../types'

export type GithubIconProps = ComponentBaseProps & {
  size?: number
  onClick?: (() => void) | undefined
}
