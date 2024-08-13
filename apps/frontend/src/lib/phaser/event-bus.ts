import { Events } from 'phaser'

export const EventBus = new Events.EventEmitter()

export enum EventBusEvents {
  GameStateInitialization = 'game-state-initialization',
  KnightHit = 'player-hit',
  LiveDecreased = 'live-decreased',
  CoinGenerated = 'coin-generated',
  CoinPicked = 'coin-picked',
  CollectJumpPower = 'collect-jump-power',
  StopCollectJumpPower = 'stop-collect-jump-power',
  SlopeOvercomed = 'slope-overcomed',
  LogMapDifficulty = 'log-map-difficulty',
  SecondPassed = 'second-passed',
  TimeGained = 'time-gained',
  ChunkEnded = 'chunk-ended',
  LifeAdded = 'life-added',
  PlayerDead = 'player-dead',
  PlayerRelocated = 'player-relocated',
  AddNote = 'add-note',
  DestroyNote = 'destroy-note',
  SuggestedAction = 'suggested-action',
  ParametrChanged = 'parameter-changed',
  DifficultyScoreIncrease = 'difficulty-score-increase',
  DifficultyScoreDecrease = 'difficulty-score-decrease',
  RestartGame = 'restart-game',
}
