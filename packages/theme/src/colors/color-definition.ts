import type { Palette } from '@mui/material'

import { brandColors } from './brand'

/**
 * Used color keys from Palette
 */
type PaletteKey =
  | keyof Pick<Palette, 'bodyText' | 'border' | 'primary' | 'surface'>
  | ('state.error' | 'state.success' | 'state.warning')

type Colors = Record<string, unknown>

type ColorType = {
  /**
   * Palette key where its colors can be found under.
   */
  key: PaletteKey
  /**
   * Title for Storybook
   */
  title: string
  /**
   * List of colors listed in Storybook
   */
  colors: Colors
}

/**
 * Color definition represents colors used in the project and to be easily generated into MUI theme and Storybook.
 */
export const colorDefinition: ColorType[] = [
  {
    key: 'primary',
    title: 'Primary',
    colors: brandColors.primary as Colors,
  },
  {
    key: 'bodyText',
    title: 'Text',
    colors: brandColors.bodyText as Colors,
  },
  {
    key: 'surface',
    title: 'Surface',
    colors: brandColors.surface as Colors,
  },
  {
    key: 'border',
    title: 'Border',
    colors: brandColors.border as Colors,
  },
  {
    key: 'state.success',
    title: 'State Success',
    colors: brandColors.state?.success as Colors,
  },
  {
    key: 'state.warning',
    title: 'State Warning',
    colors: brandColors.state?.warning as Colors,
  },
  {
    key: 'state.error',
    title: 'State Error',
    colors: brandColors.state?.error as Colors,
  },
]
