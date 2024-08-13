import type { breakpoints } from '@lukasbriza/theme'

export type BreakpointValue = keyof typeof breakpoints.values

export type WidthState = Record<BreakpointValue, boolean | undefined> & { value?: number | undefined }

export type BreakpointContextValue = WidthState
