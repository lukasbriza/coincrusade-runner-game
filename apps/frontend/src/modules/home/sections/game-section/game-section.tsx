import type { FC } from 'react'

import { anchors } from '@/shared'

import { Background } from '../../component/background'
import { EngineSelector } from '../../component/engine-selector'
import { InitialAnimation } from '../../component/initial-animation'

import { Root } from './styles'

export const GameSection: FC = () => (
  <Root id={anchors[0].path}>
    <Background />
    <InitialAnimation />
    <EngineSelector />
  </Root>
)
