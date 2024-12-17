import { ThemeProvider } from '@lukasbriza/theme'
import type { ReactNode } from 'react'

import { BreakpointProvider } from '../breakpoint-context'

export const WithThemeAndBreakpoint = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <BreakpointProvider>{children}</BreakpointProvider>
  </ThemeProvider>
)
