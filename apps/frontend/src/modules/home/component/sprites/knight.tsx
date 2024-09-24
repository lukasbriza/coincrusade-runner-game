import { forwardRef } from 'react'

import type { SpriteProps } from './types'

export const Knight = forwardRef<HTMLImageElement, SpriteProps>(({ className }, ref) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img ref={ref} alt="knight gif" className={className} src="knight.gif" />
))
