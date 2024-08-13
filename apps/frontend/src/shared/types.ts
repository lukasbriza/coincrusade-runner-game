import type { NextPage } from 'next'
import type { MessageKeys } from 'next-intl'
import type { PropsWithChildren, ReactNode } from 'react'

import type { Locale } from '@/i18n/config'

import type en from '../i18n/locales/en.json'

/**
 * Locale const translated to type
 */
export type Locale = (typeof Locale)[keyof typeof Locale]

/**
 * Root parameters for all pages
 */
export type WebPageParams = {
  locale: Locale
}

/**
 * Root props for all pages
 */
export type WebPageProps<T extends WebPageParams = WebPageParams> = {
  params: T
}

/**
 * Async layout type.
 */
export type AsyncWebLayout = (props: PropsWithChildren<WebPageProps>) => ReactNode

/**
 * Page type
 */
export type WebPage<T extends WebPageProps = WebPageProps, I = T> = NextPage<T, I>

type routes = typeof en.anchors
export type Anchor = { path: string; title: MessageKeys<routes, keyof routes> }
export type MenuItem = { path: string; name: string; active: boolean }

export type SuggesteAction = 'decrease' | 'increase' | 'neutral' | undefined

export enum ChangeTypes {
  IncreasePlatformSpeed = 'IncreasePlatformSpeed',
  DecreasePlatformSpeed = 'DecreasePlatformSpeed',
  IncreaseCoinChance = 'IncreaseCoinChance',
  DecreaseCoinChance = 'DecreaseCoinChance',
  IncreaseMapDifficulty = 'IncreaseMapDifficulty',
  DecreaseMapDifficulty = 'DecreaseMapDifficulty',
  IncreaseChestChance = 'IncreaseChestChance',
  DecreaseChestChance = 'DecreaseChestChance',
}

export type ChunkLog = {
  chunkLostLives: number
  chunkElapsedSeconds: number
  chunkGainedSeconds: number
  chunkPickedCoins: number
  chunkGeneratedCoins: number
  chunkMapDifficulties: number[]
  chunkPlatformSpeed: number
  chunkDifficultySkore: number
  gameTotalElapsedSeconds: number
  gameTotalGainedSeconds: number
  engineSuggestedAction: SuggesteAction
  chunkCreated: Date
}

export type LastChunk = {
  lastChunkLostLives: number
  lastChunkElapsedSeconds: number
  lastChunkGainedSeconds: number
  lastChunkPickedCoins: number
  lastChunkGeneratedCoins: number
  lastChunkMapDifficulties: number[]
  lastChunkSuggestedAction: SuggesteAction
  lastChunkChange?: ChangeTypes | undefined
}

export type PlayerState = {
  difficultyScore: number
  pickedCoins: number
  generatedCoins: number
  overcomedSlopes: number
  lostLives: number
  actualLives: number
  elapsedSeconds: number
  gainedSeconds: number
  playerIsDead: boolean
}
