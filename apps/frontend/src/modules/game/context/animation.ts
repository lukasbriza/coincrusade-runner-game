import gsap from 'gsap'

import { gameClasses } from '../components/game/classes'

export const showGameUiOverlay = () => gsap.set(`.${gameClasses.gameUiOverlay}`, { display: 'initial' })

export const hideGameUIOverlay = () => gsap.set(`.${gameClasses.gameUiOverlay}`, { clearProps: 'display' })
