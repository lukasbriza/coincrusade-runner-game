import type { WebFontWeight, WebTypographyVariants } from '@lukasbriza/theme'
import type { TypographyProps } from '@mui/material'
import type { PropsWithoutRef } from 'react'

import type { ComponentBaseProps, ResponsiveProp } from '../types'

export type TextResponsiveProps = {
  /**
   * Responsive font size.
   */
  fontSize?: ResponsiveProp<keyof WebTypographyVariants>
  /**
   * Responsive font weight.
   */
  fontWeight?: ResponsiveProp<WebFontWeight>
  /**
   * Responsive line height.
   */
  lineHeight?: ResponsiveProp<keyof WebTypographyVariants>
}

export type TextProps = ComponentBaseProps &
  Omit<
    PropsWithoutRef<TypographyProps>,
    | 'block'
    | 'className'
    | 'fontFamily'
    | 'fontSize'
    | 'fontStyle'
    | 'fontWeight'
    | 'lineHeight'
    | 'sx'
    | 'typography'
    | 'variant'
    | 'variantMapping'
  > &
  TextResponsiveProps & {
    variant: keyof WebTypographyVariants
  }
