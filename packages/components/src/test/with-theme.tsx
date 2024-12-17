import { ThemeProvider } from '@lukasbriza/theme'
import type { ReactNode } from 'react'

export const WithTheme = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>
