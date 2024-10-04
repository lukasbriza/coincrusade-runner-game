'use client'

import { Button, CloseIcon, Text } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'

import { NumberInputControlled } from '../controlled-inputs/number-input-controlled'

export const FormRoot = styled('form')(({ theme: { spacing } }) => ({
  position: 'relative',
  paddingLeft: spacing(5),
  paddingRight: spacing(5),

  paddingBottom: spacing(3),
  display: 'grid',
  gridTemplateAreas: `
    "header header"
    "generator generator"
    "warning warning"
    "form form"
    "button button"
  `,
  width: '80vw',
  maxWidth: 750,
  maxHeight: '80vh',
  justifyItems: 'center',
}))

export const Cross = styled(CloseIcon)(({ theme: { spacing, size, palette } }) => ({
  position: 'absolute',
  width: size.size11,
  padding: spacing(1),
  borderRadius: '50%',
  transition: 'background 0.215s ease-in',
  background: 'transparent',
  cursor: 'pointer',
  justifySelf: 'end',

  '&:hover': {
    background: palette.surface.secondary,
  },
}))

export const Header = styled(Text)(({ theme: { spacing, breakpoints, typography } }) => ({
  gridArea: 'header',
  paddingTop: spacing(7),

  [breakpoints.down(510)]: {
    fontSize: typography.h3.fontSize,
  },
}))

export const GeneratorText = styled(Text)(({ theme: { spacing, breakpoints, typography } }) => ({
  gridArea: 'generator',
  paddingBottom: spacing(3),

  [breakpoints.down(510)]: {
    fontSize: typography.h5.fontSize,
  },
}))

export const WarningText = styled(Text)(({ theme: { spacing } }) => ({
  gridArea: 'warning',
  textAlign: 'center',
  paddingBottom: spacing(5),
}))

export const FormContent = styled('section')(() => ({
  gridArea: 'form',
  alignItems: 'end',
}))

export const FormItem = styled('div')(({ theme: { spacing, breakpoints } }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 160px',
  columnGap: spacing(3),

  [breakpoints.down(700)]: {
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
  },
}))

export const FormText = styled(Text)(({ theme: { breakpoints } }) => ({
  paddingBottom: 23,

  [breakpoints.down(700)]: {
    textAlign: 'center',
  },
}))

export const FormInput = styled(NumberInputControlled)(({ theme: { breakpoints } }) => ({
  '& > input': {
    textAlign: 'center',
  },

  [breakpoints.down(700)]: {
    width: 170,
  },
}))

export const ModalButton = styled(Button)(({ theme: { breakpoints } }) => ({
  width: 150,

  [breakpoints.down('md')]: {
    width: '100%',
  },
}))

export const ButtonWrapper = styled('div')(({ theme: { spacing, breakpoints } }) => ({
  gridArea: 'button',
  display: 'flex',
  columnGap: spacing(12),
  paddingTop: spacing(4),
  paddingBottom: spacing(6),

  [breakpoints.down('md')]: {
    flexDirection: 'column',
    rowGap: spacing(4),
    width: '60%',
  },
}))
