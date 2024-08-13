import type { Metadata } from 'next'

import type { WebPage } from '@/shared/types'

import { Game } from './components/game/game'

export const rootMetadata = {
  title: 'Knight´s quest',
} satisfies Metadata

export const dynamic = 'force-dynamic'

export const GamePage: WebPage = () => <Game />
