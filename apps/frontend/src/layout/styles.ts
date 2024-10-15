'use client'

import type { OwnerState } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'

import { apertureClasses } from '@/modules/home/context'
import { PAGE_MAX_WIDTH } from '@/shared'
import { menuWrapperClasses } from '@/shared/components/menu-wrapper'

export const Page = styled('div')<OwnerState<{ isMenuHidden: boolean }>>(
  ({ ownerState: { isMenuHidden }, theme: { palette, spacing } }) => ({
    background: palette.bodyText.primary,
    color: palette.bodyText.primary,
    paddingTop: isMenuHidden ? 0 : spacing(13),
    minHeight: '100vh',
    overflowX: 'hidden',
    display: isMenuHidden ? 'flex' : 'unset',
    justifyContent: isMenuHidden ? 'center' : 'unset',
    alignItems: isMenuHidden ? 'center' : 'unset',

    [`& .${apertureClasses.root}`]: {
      width: '100%',
      maxWidth: PAGE_MAX_WIDTH,
      left: '50%',
      transform: 'translateX(-50%)',
    },

    [`& .${menuWrapperClasses.mobileRoot}`]: {
      backdropFilter: 'blur(5px)',
    },
  }),
)
