/* eslint-disable func-names */
/* eslint-disable lines-between-class-members */

import { gameRestartListener, knightDeadListener, noteAddedListener } from '../events'
import type { IScene } from '../types'
import { getTranslation } from '../utils'

import { CoinCounter } from './coin-counter'
import { LifeCounter } from './life-counter'
import { TimeCounter } from './time-counter'
import type { ICoinCounter, ILifeCounter, IPlayerStatus, ITimeCounter } from './types'

const setupGameOverNote = (note: INote, scale: number) => {
  note.setOrigin(0.5, 0.5)
  note.setScale(scale, scale)
  note.setTintFill(0xef_3a_0c)
  note.setDepth(100)
}

export class PlayerStatus implements IPlayerStatus {
  private scene: IScene

  public coinCounter: ICoinCounter
  public timeCounter: ITimeCounter
  public lifeCounter: ILifeCounter

  private notes: INote[] = []

  constructor(scene: IScene) {
    this.scene = scene

    this.lifeCounter = new LifeCounter(scene)
    this.coinCounter = new CoinCounter(scene, 57)
    this.timeCounter = new TimeCounter(this.scene, this.coinCounter.nearTextCoin.height + 60)

    this.destoryNotes()
    this.init()
  }

  private init() {
    knightDeadListener(() => {
      this.destoryNotes()
      this.playerDeadNotes()
    })
    gameRestartListener(this.destoryNotes)
    noteAddedListener((text, warning, duration) => this.handleAddNote(text, warning, duration))
  }

  private destoryNotes = () => {
    for (const note of this.notes) {
      note.destroy(true)
    }
    this.notes = []
  }

  private handleAddNote(text: string, warning: boolean = false, duration: number = 10_000) {
    const warningColor = 0xef_3a_0c
    const okColor = 0x5e_b1_38
    const note = this.scene.add.note(text, 'center', 0)
    note.setTintFill(warning ? warningColor : okColor)
    note.destroyAfter(duration)

    this.notes.push(note)
    this.drawNotes()
  }

  private drawNotes() {
    this.notes = this.notes.filter((note) => note.active === true)
    for (const [index, note] of this.notes.entries()) {
      const y = note.height * index
      const x = this.scene.renderer.width / 2 - note.width / 2
      note.setOrigin(0, 0)
      note.setPosition(x, y)
    }
  }

  private playerDeadNotes() {
    const { gameEnd } = getTranslation(this.scene.gameConfig.lng)
    const restartNote = this.scene.add.note(
      gameEnd.restartStatement,
      this.scene.renderer.width / 2,
      this.scene.renderer.height / 2,
    )
    const gameover = this.scene.add.note(
      gameEnd.statement,
      this.scene.renderer.width / 2,
      this.scene.renderer.height / 2 - (restartNote.height ?? 0),
    )
    const quitNote = this.scene.add.note(
      gameEnd.gameLeaveStatement,
      this.scene.renderer.width / 2,
      this.scene.renderer.height / 2 + (restartNote.height ?? 0) / 2 + 10,
    )
    setupGameOverNote(restartNote, 2)
    setupGameOverNote(gameover, 4)
    setupGameOverNote(quitNote, 2)

    this.notes.push(restartNote, gameover, quitNote)
  }
}
