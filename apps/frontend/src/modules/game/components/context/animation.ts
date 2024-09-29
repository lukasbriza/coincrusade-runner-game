import gsap from 'gsap'

import { gameClasses } from '../game/classes'

export const showGameUiOverlay = () => gsap.set(`.${gameClasses.gameUiOverlay}`, { display: 'initial' })

export const hideGameUIOverlay = () => gsap.set(`.${gameClasses.gameUiOverlay}`, { clearProps: 'display' })
