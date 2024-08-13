'use client'

import { ScaleIcon, type OwnerState } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'
import Image from 'next/image'

import { CONTROLS_VERTICAL_PERGAMEN_BREAKPOINT, PERGAMEN_MAX_WIDTH } from '@/shared'

import { controlsPartClasses } from './classes'

export const Root = styled('section')(({ theme: { size, spacing, breakpoints } }) => ({
  position: 'relative',
  zIndex: 1,
  minHeight: size.size32,
  width: '80%',
  maxWidth: PERGAMEN_MAX_WIDTH,
  left: '50%',
  transform: 'translateX(-50%)',

  [breakpoints.down(CONTROLS_VERTICAL_PERGAMEN_BREAKPOINT)]: {
    width: '90%',
  },

  [breakpoints.down('sm')]: {
    width: '100%',
  },

  [`& .${controlsPartClasses.header}`]: {
    position: 'relative',
    width: 'fit-content',
    paddingBottom: spacing(3),
    paddingTop: spacing(4),
    gridArea: 'header',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}))

export const ContentRoot = styled('div')(({ theme: { spacing, breakpoints } }) => ({
  padding: spacing(6),
  paddingTop: spacing(3),
  paddingBottom: spacing(8),
  display: 'grid',
  justifyItems: 'center',
  alignItems: 'center',
  gridTemplateAreas: `
    "video keys"
    "video text"
  `,
  gridTemplateColumns: '1fr 345px',
  columnGap: spacing(6),
  rowGap: spacing(3),

  [breakpoints.down('lg')]: {
    gridTemplateAreas: `
      "video video"
      "keys text"
    `,
    gridTemplateColumns: 'min-content 1fr',
    rowGap: spacing(6),
    paddingBottom: spacing(13),
    maxWidth: 800,
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
  },

  [breakpoints.down(1050)]: {
    gridTemplateAreas: `
      "video"
      "keys"
      "text"
    `,
    gridTemplateColumns: '1fr',
  },

  [breakpoints.down(CONTROLS_VERTICAL_PERGAMEN_BREAKPOINT)]: {
    paddingBottom: 0,
  },

  [breakpoints.down(400)]: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },

  [`& .${controlsPartClasses.video}`]: {
    gridArea: 'video',
    justifySelf: 'start',

    [breakpoints.down('lg')]: {
      width: '100%',
      maxWidth: 'unset',
      justifySelf: 'center',
    },
  },

  [`& .${controlsPartClasses.keyboard}`]: {
    gridArea: 'keys',

    [breakpoints.down('lg')]: {
      width: 300,
    },

    [breakpoints.down(CONTROLS_VERTICAL_PERGAMEN_BREAKPOINT)]: {
      width: '100%',
      maxWidth: 350,
    },
  },

  [`& .${controlsPartClasses.text}`]: {
    gridArea: 'text',
    textAlign: 'left',
    width: '100%',

    [breakpoints.down(1050)]: {
      textAlign: 'center',
    },
  },
}))

export const PergamenBackgroundRoot = styled('div')<OwnerState<{ visible: boolean }>>(
  ({ ownerState: { visible } }) => ({
    zIndex: -1,
    position: 'relative',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: visible ? 'block' : 'none',
  }),
)

export const PergamenBackgroundVerticalRoot = styled(PergamenBackgroundRoot)<OwnerState<{ offset: number }>>(
  ({ ownerState: { offset } }) => ({
    height: `calc(100% + ${offset}px)`,
  }),
)

export const PergamenLeftSide = styled(Image)(() => ({
  objectFit: 'fill',
  position: 'absolute',
  left: 0,
  top: '50% !important',
  transform: 'translateY(-50%)',
  height: '121% !important',
  maxWidth: 100,
}))

export const PergamenTop = styled(Image)(() => ({
  position: 'absolute',
  inset: 'unset !important',
  left: '50% !important',
  transform: 'translateX(-50%)',
  top: '0px !important',
  objectFit: 'fill',
  width: '100%',
  height: 'unset !important',
}))

export const PergamenRightSide = styled(Image)(() => ({
  objectFit: 'fill',
  position: 'absolute',
  height: '121% !important',
  inset: 'unset !important',
  right: '0px !important',
  top: '50% !important',
  transform: 'translateY(-50%)',
  maxWidth: 100,
}))

export const PergamenBottom = styled(PergamenTop)(() => ({
  top: 'unset !important',
  bottom: '0px !important',
}))

export const PergamenMain = styled(Image)<OwnerState<{ leftOffset: number; rightOffset: number }>>(
  ({ ownerState: { leftOffset, rightOffset } }) => ({
    top: 0,
    left: '50% !important',
    transform: 'translateX(-50%)',
    width: `calc(100% - ${leftOffset + rightOffset - 20}px) !important`,
    height: '100%',
    objectFit: 'fill',
    position: 'absolute',
  }),
)

export const PergamenMainVerical = styled(Image)<OwnerState<{ offset: number }>>(({ ownerState: { offset } }) => ({
  inset: 'unset !important',
  top: '50% !important',
  height: `calc(100% - ${offset}px) !important`,
  width: '85% !important',
  left: '50% !important',
  transform: 'translate(-50%, -50%)',
  objectFit: 'fill',
  position: 'absolute',
}))

export const Content = styled('div')<OwnerState<{ leftOffset: number; rightOffset: number }>>(
  ({ ownerState: { leftOffset, rightOffset }, theme: { spacing } }) => ({
    position: 'relative',
    top: 0,
    width: `calc(100% - ${leftOffset + rightOffset - 10}px)`,
    height: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: spacing(2),
  }),
)

export const ContentVertical = styled('div')<OwnerState<{ topOffset: number; bottomOffset: number }>>(
  ({ theme: { spacing }, ownerState: { bottomOffset, topOffset } }) => ({
    position: 'relative',
    width: '85%',
    height: `100%`,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: spacing(2),
    paddingTop: topOffset,
    paddingBottom: bottomOffset,
  }),
)

export const Video = styled('video')(({ theme: { palette, size } }) => ({
  width: '100%',
  background: palette.common.black,
  border: `${palette.border.primary} ${size.size1}px solid`,
}))

export const VideoWrapper = styled('div')(() => ({
  position: 'relative',
  width: '100%',
  maxWidth: 700,
}))

export const Icon = styled(ScaleIcon)(({ theme: { spacing, size, palette } }) => ({
  zIndex: 10,
  cursor: 'pointer',
  position: 'absolute',
  right: spacing(2),
  top: spacing(2),
  background: 'transparent',
  width: size.size9,
  padding: spacing(2),
  borderRadius: '50%',
  transition: 'background 0.215s ease-in',

  '&:hover': {
    background: palette.surface.secondary,
  },
}))
