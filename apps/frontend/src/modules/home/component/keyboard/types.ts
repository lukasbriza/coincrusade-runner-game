import type { ComponentBaseProps } from '@lukasbriza/components'

export type KeyboardProps = ComponentBaseProps & {
  activeKeys?: KeyboardKeys[]
  animate?: boolean | undefined
}

export enum KeyboardKeys {
  LEFT,
  RIGHT,
  UP,
  DOWN,
  SPACE,
}

export type KeyboardBaseProps = ComponentBaseProps & {
  leftActive: boolean | undefined
  rightActive: boolean | undefined
  upActive: boolean | undefined
  downActive: boolean | undefined
  spaceActive: boolean | undefined
}

export type AnimationWrapperProps = KeyboardBaseProps
