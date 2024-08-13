import type { ComponentBaseProps } from '../types'

export type HeroTextProps = ComponentBaseProps & {
  main: string
  subtitle: string
  mainClassName?: string
  subtitleClassName?: string
}
