'use client'

import { Text } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'

export const Root = styled(Text)(({ theme: { spacing } }) => ({
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'fit-content',
  paddingBottom: spacing(4),
}))
