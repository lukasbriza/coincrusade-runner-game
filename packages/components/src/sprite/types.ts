import type { ComponentBaseProps } from '../types'

export type SpriteProps = ComponentBaseProps & {
  width: number
  height: number
  image: string
  columns: number
  rows: number
  duration: number
  xOffset?: number
}
