import type { CSSProperties } from 'react'

/**
 * Font weights supported by Web theme.
 */
export type WebFontWeight = 'bold' | 'medium' | 'regular'

/**
 * Typography variants.
 */
export type WebTypographyVariants = {
  h1: CSSProperties
  h2: CSSProperties
  h3: CSSProperties
  h4: CSSProperties
  h5: CSSProperties
  S: CSSProperties
  M: CSSProperties
  L: CSSProperties
  XL: CSSProperties
}
