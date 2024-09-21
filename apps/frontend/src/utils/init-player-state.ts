import type { PlayerState } from '@/lib/phaser'

export const initPlayerState = (): PlayerState => ({
  difficultyScore: 0,
  pickedCoins: 0,
  generatedCoins: 0,
  overcomedSlopes: 0,
  lostLives: 0,
  actualLives: 0,
  elapsedSeconds: 0,
  gainedSeconds: 0,
  playerIsDead: false,
  platformSpeed: 180,
})
