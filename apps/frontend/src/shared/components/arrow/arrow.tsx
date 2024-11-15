import { type FC } from 'react'

import { ArrowImage, Root } from './styles'
import type { ArrowProps } from './types'

export const Arrow: FC<ArrowProps> = ({ left, animated, height, width, className, show, sizes, onClick }) => (
  <Root className={className} ownerState={{ height, width, show }} onClick={onClick}>
    <ArrowImage
      alt="switch generator arrow"
      fill
      ownerState={{ left, animated, show }}
      sizes={sizes}
      src="/arrow.png"
    />
  </Root>
)
