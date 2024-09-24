import { DownKey, LeftKey, RightKey, Space, UpKey } from '@lukasbriza/components'
import type { FC } from 'react'

import { keyboardClasses } from './classes'
import { MovementKeysWrapper, Root } from './styles'
import type { KeyboardBaseProps } from './types'

export const KeyboardBase: FC<KeyboardBaseProps> = ({
  className,
  spaceActive,
  upActive,
  leftActive,
  downActive,
  rightActive,
}) => (
  <Root className={className}>
    <Space className={keyboardClasses.space} isActive={spaceActive} />
    <MovementKeysWrapper>
      <UpKey className={keyboardClasses.up} isActive={upActive} />
      <LeftKey className={keyboardClasses.left} isActive={leftActive} />
      <DownKey className={keyboardClasses.down} isActive={downActive} />
      <RightKey className={keyboardClasses.right} isActive={rightActive} />
    </MovementKeysWrapper>
  </Root>
)
