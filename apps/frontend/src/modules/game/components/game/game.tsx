'use client'

import dynamic from 'next/dynamic'

const GameElementWithNoSSR = dynamic(() => import('./game-element'), { ssr: false })

export const Game = () => <GameElementWithNoSSR />
