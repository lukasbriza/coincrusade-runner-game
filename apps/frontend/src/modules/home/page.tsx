import { BreakpointProvider } from '@lukasbriza/components'
import type { Metadata } from 'next'

import { IntersectionBlur } from '@/shared/components'
import type { WebPage } from '@/shared/types'

import { ApertureProvider, ContactSection, ControlsSection, GameSection } from './component'
import { Main } from './styles'

export const rootMetadata = {
  title: 'Knight´s quest',
} satisfies Metadata

// DISABLE CACHING FOR THIS ROUTE SEGMENT
export const dynamic = 'force-dynamic'

export const HomePage: WebPage = () => (
  <ApertureProvider>
    <BreakpointProvider>
      <Main>
        <GameSection />
        <IntersectionBlur height={60} top zIndex={1} />
        <ControlsSection />
        <ContactSection />
      </Main>
    </BreakpointProvider>
  </ApertureProvider>
)
