import type { WebTheme } from '@lukasbriza/theme'

/**
 * Generic type for deriving owner state for styled components
 */
export type OwnerState<T> = {
  ownerState: T
}

/**
 * Generic type for responsive props (e.g. padding, margin, width, etc.) that are mapped to specific theme breakpoints.
 */
export type ResponsiveProp<T> = Partial<Record<WebTheme['breakpoints']['keys'][number], T>> | T | undefined

export type ComponentBaseProps = {
  className?: string | undefined
}
