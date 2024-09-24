import type { ReactNode } from 'react'

import type { ComponentBaseProps } from '../types'

export type ApertureProps = ComponentBaseProps & {
  stage?: 1 | 2 | 3 | undefined
  initialStage?: 1 | 2 | 3 | undefined
  children: ReactNode
}
