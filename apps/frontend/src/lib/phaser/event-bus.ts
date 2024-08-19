import { Events } from 'phaser'

export const EventBus = new Events.EventEmitter()

export enum EventBusEvents {
  GameStateInitialization = 'game-state-initialization',

  KnightHit = 'knight-hit',
  KnightHitCallback = 'knight-hit-callback',
  KnightLeftSideCollision = 'knight-left-side-collision',
  KnightDead = 'knight-dead',

  CoinGenerated = 'coin-generated',

  LogMapDifficulty = 'log-map-difficulty',

  NoteDestroyed = 'note-destroyed',

  SecondPassed = 'second-passed',
  SecondsGain = 'seconds-gain',

  PlayerRelocate = 'player-relocate',
  RestartGame = 'restart-game',
  EndGame = 'end-game',
  ChunkEnd = 'chunk-end',
  ThrowError = 'throw-error',
}
