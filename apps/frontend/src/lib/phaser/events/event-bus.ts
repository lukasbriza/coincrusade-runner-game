import { Events } from 'phaser'

export const EventBus = new Events.EventEmitter()

export enum EventBusEvents {
  GameStateInitialization = 'game-state-initialization',
  GameElementInitialization = 'game-element-initialization',

  GenerateInitialChunk = 'generate-initial-chunk',
  GenerateInitialChunkCallback = 'generate-initial-chunk-callback',

  KnightHit = 'knight-hit',
  KnightHitCallback = 'knight-hit-callback',
  KnightLeftSideCollision = 'knight-left-side-collision',
  KnightDead = 'knight-dead',

  LifeAdded = 'life-added',

  CoinGenerated = 'coin-generated',
  CoinPicked = 'coin-picked',

  LogMapDifficulty = 'log-map-difficulty',

  NoteAdded = 'note-added',
  NoteDestroyed = 'note-destroyed',

  SecondPassed = 'second-passed',
  SecondsGain = 'seconds-gain',

  SuggestedAction = 'suggested-action',

  AppliedChange = 'applied-change',

  GenerateMethod = 'generate-method',

  ResolveDifficulty = 'resolve-difficulty',

  SlopeOvercome = 'slope-overcome',

  ReasignPlatformSpeed = 'reasign-platform-speed',
  ReasignPlatformSpeedCallback = 'reasign-platform-speed-callback',

  PlayerRelocate = 'player-relocate',
  RestartGame = 'restart-game',
  EndGame = 'end-game',
  ChunkEnd = 'chunk-end',
  ThrowError = 'throw-error',

  LoadConfiguration = 'load-configuration',
  LoadConfigurationCallback = 'load-configuration-callback',
}
