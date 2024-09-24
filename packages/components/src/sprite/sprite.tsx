import type { FC } from 'react'

import { SpriteImage } from './styles'
import type { SpriteProps } from './types'

export const Sprite: FC<SpriteProps> = (props) => <SpriteImage ownerState={{ ...props }} />
