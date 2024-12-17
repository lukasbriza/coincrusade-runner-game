import type { FC } from 'react'

import { Filler, Percents, Root } from './styles'
import type { LoadingBarProps } from './types'

export const LoadingBar: FC<LoadingBarProps> = ({ className, fillerClass, progress, maxProgressValue }) => {
  const onePercentValue = maxProgressValue / 100
  const percentValue = progress / onePercentValue

  if (percentValue > 100) {
    // eslint-disable-next-line no-console
    console.warn('LoadingBar: progress is more than maxProgressValue')
  }

  return (
    <Root className={className} data-testid="loadingbar">
      <Filler className={fillerClass} ownerState={{ width: percentValue }} />
      <Percents variant="M">{percentValue.toFixed(0)}%</Percents>
    </Root>
  )
}
