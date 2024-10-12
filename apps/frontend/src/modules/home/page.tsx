import { BreakpointProvider } from '@lukasbriza/components'
import type { Metadata } from 'next'

import { IntersectionBlur } from '@/shared/components'
import type { WebPage } from '@/shared/types'

import { ApertureProvider } from './context'
import { ContactSection, ControlsSection, GameSection } from './sections'
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
        <IntersectionBlur height={60} top zIndex={0} />
        <ControlsSection />
        <ContactSection />
      </Main>
    </BreakpointProvider>
  </ApertureProvider>
)
