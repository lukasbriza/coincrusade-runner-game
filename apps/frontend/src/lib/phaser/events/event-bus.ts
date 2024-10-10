import { Events } from 'phaser'

export const EventBus = new Events.EventEmitter()

export enum EventBusEvents {
  GenerateInitialChunk = 'generate-initial-chunk',

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

  GenerateMethod = 'generate-method',

  ReasignPlatformSpeedCallback = 'reasign-platform-speed-callback',

  PlayerRelocate = 'player-relocate',
  RestartGame = 'restart-game',
  EndGame = 'end-game',
  PauseGame = 'pause-game',
  ResumeGame = 'resume-game',
  ChunkEnd = 'chunk-end',
  ThrowError = 'throw-error',

  LoadConfiguration = 'load-configuration',
  LoadConfigurationCallback = 'load-configuration-callback',

  LoadProgress = 'load-progress',
}
