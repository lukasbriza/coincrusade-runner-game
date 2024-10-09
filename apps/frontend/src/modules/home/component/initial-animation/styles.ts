'use client'

import type { OwnerState } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'

import { PAGE_MAX_WIDTH } from '@/shared/constants'

import { animationClasses } from './classes'

export const Root = styled('div')<OwnerState<{ apertureLoaded: boolean }>>(({ theme: { breakpoints } }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  maxWidth: PAGE_MAX_WIDTH,
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',

  [`& .${animationClasses.hero}`]: {
    opacity: 0,
  },

  [`&  .${animationClasses.subtitle}`]: {
    fontSize: '55px !important',
  },

  [breakpoints.down('md')]: {
    [`&  .${animationClasses.main}`]: {
      fontSize: '61px !important',
    },
    [`&  .${animationClasses.subtitle}`]: {
      fontSize: '45px !important',
    },
  },
  [breakpoints.down('sm')]: {
    [`&  .${animationClasses.main}`]: {
      fontSize: '41px !important',
    },
    [`&  .${animationClasses.subtitle}`]: {
      fontSize: '30px !important',
    },
  },
}))
