import type { FC } from 'react'

import { Background } from '../background'
import { EngineSelector } from '../engine-selector'
import { InitialAnimation } from '../initial-animation'

import { Root } from './styles'

export const GameSection: FC = () => (
  <Root>
    <InitialAnimation />
    <EngineSelector />
    <Background />
  </Root>
)
