'use client'

import type { Metadata } from 'next'

import type { WebPage } from '@/shared/types'

import { GameElement } from './components'

export const rootMetadata = {
  title: 'Knight´s quest',
} satisfies Metadata

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export const GamePage: WebPage = () => <GameElement />
