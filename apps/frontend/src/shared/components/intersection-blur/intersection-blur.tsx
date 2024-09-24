import type { FC } from 'react'

import { Root } from './styles'
import type { IntersectionBlurProps } from './types'

export const IntersectionBlur: FC<IntersectionBlurProps> = ({ height, top, zIndex, className, blurLevel }) => (
  <Root className={className} ownerState={{ height, top, zIndex, blurLevel }} />
)
