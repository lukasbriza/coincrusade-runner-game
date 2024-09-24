import type { FC } from 'react'

import { AnimationWrapper } from './animation-wrapper'
import { KeyboardBase } from './base'
import { KeyboardKeys, type KeyboardProps } from './types'

export const Keyboard: FC<KeyboardProps> = ({ activeKeys, className, animate }) => {
  const leftActive = activeKeys?.includes(KeyboardKeys.LEFT)
  const rightActive = activeKeys?.includes(KeyboardKeys.RIGHT)
  const upActive = activeKeys?.includes(KeyboardKeys.UP)
  const downActive = activeKeys?.includes(KeyboardKeys.DOWN)
  const spaceActive = activeKeys?.includes(KeyboardKeys.SPACE)

  if (animate) {
    return (
      <AnimationWrapper
        className={className}
        downActive={downActive}
        leftActive={leftActive}
        rightActive={rightActive}
        spaceActive={spaceActive}
        upActive={upActive}
      />
    )
  }

  return (
    <KeyboardBase
      className={className}
      downActive={downActive}
      leftActive={leftActive}
      rightActive={rightActive}
      spaceActive={spaceActive}
      upActive={upActive}
    />
  )
}
