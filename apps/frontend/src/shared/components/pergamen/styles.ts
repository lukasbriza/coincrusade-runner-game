'use client'

import type { OwnerState } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'

import { pergamenClasses } from './classes'

export const Root = styled('div')<
  OwnerState<{
    width?: number | undefined
    topTop?: number | undefined
    bottomTop?: number | undefined
    ribbonTop?: number | undefined
  }>
>(({ theme: { breakpoints }, ownerState: { width, topTop, bottomTop, ribbonTop } }) => ({
  position: 'relative',
  width: '60%',
  maxWidth: 500,
  height: '100%',

  [breakpoints.down(500)]: {
    width: '100%',
  },

  [`& .${pergamenClasses.body}`]: {
    objectFit: 'fill',
    top: '50% !important',
    transform: 'translateY(-50%)',
    height: '60%',
    minHeight: 400,
  },
  [`& .${pergamenClasses.top}`]: {
    height: 'unset !important',
    objectFit: 'contain',
    top: `${topTop}px`,
    width: width ? `${width}px !important` : 'unset',
    left: '50% !important',
    transform: 'translateX(-50%)',
  },
  [`& .${pergamenClasses.bottom}`]: {
    height: 'unset !important',
    objectFit: 'contain',
    width: width ? `${width}px !important` : 'unset',
    left: '50% !important',
    transform: 'translateX(-50%)',
    top: `${bottomTop}px`,
  },
  [`& .${pergamenClasses.ribbon}`]: {
    cursor: 'pointer',
    objectFit: 'contain',
    height: 'unset !important',
    width: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    top: `${ribbonTop}px`,
  },
}))

export const Content = styled('div')<
  OwnerState<{ paddingTop?: number | undefined; paddingBottom?: number | undefined; height?: number | undefined }>
>(({ ownerState: { paddingBottom, paddingTop, height } }) => ({
  position: 'absolute',
  overflow: 'hidden',
  textAlign: 'center',
  marginLeft: 20,
  marginRight: 20,
  paddingTop: paddingTop || '20%',
  paddingBottom: paddingBottom || '10%',
  width: 'calc(100% - 40px)',
  top: '50% ',
  transform: 'translateY(-50%)',
  height,
}))
