import type { FC } from 'react'

import type { SpriteProps } from './types'

export const Campfire: FC<SpriteProps> = ({ className }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img alt="campfire gif" className={className} src="campfire.gif" />
)
