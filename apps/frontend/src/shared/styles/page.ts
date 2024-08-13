'use client'

import { styled } from '@lukasbriza/styles'

import { apertureClasses } from '@/modules/home/component/context/classes'

import { menuWrapperClasses } from '../components/menu-wrapper/classes'
import { PAGE_MAX_WIDTH } from '../constants'

export const Page = styled('body')(({ theme: { palette, spacing } }) => ({
  background: palette.bodyText.primary,
  color: palette.bodyText.primary,
  paddingTop: spacing(13),
  minHeight: '100vh',

  [`& .${apertureClasses.root}`]: {
    width: '100%',
    maxWidth: PAGE_MAX_WIDTH,
    left: '50%',
    transform: 'translateX(-50%)',
  },

  [`& .${menuWrapperClasses.mobileRoot}`]: {
    backdropFilter: 'blur(5px)',
  },
}))
