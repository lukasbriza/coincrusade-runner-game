import type { ComponentBaseProps } from '../types'

export type LoadingBarProps = ComponentBaseProps & {
  maxProgressValue: number
  progress: number
  fillerClass?: string | undefined
}
