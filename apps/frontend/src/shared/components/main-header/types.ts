import type { TextProps } from '@lukasbriza/components'
import type { ReactNode } from 'react'

export type MainHeaderProps = Omit<TextProps, 'variant'> & {
  children: ReactNode
}
