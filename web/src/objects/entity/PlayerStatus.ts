import { Scene } from "phaser";
import { CoinCounter } from "./CoinCounter";
import { TimeCounter } from "./TimeCounter";
import { LifeCounter } from "./LifeCounter";
import { EVENTS } from "../../constants";
import { Note } from "./Note";
import { IPlayerStatus } from "../../interfaces/_index";
import { Eventhelper } from "../../helpers/_index";

export class PlayerStatus implements IPlayerStatus {
    public coinCounter: CoinCounter;
    public timeCounter: TimeCounter;
    public lifeCounter: LifeCounter;

    private scene: Scene;
    private eventHelper: Eventhelper;
    private notes: Note[] = [];

    constructor(scene: Scene) {
        this.scene = scene
        this.lifeCounter = new LifeCounter(scene)
        this.init()


        this.eventHelper = new Eventhelper(scene)
        this.eventHelper.addListener(EVENTS.ADD_NOTE, this.handleAddNote, this)
        this.eventHelper.addListener(EVENTS.DESTROY_NOTE, this.drawNotes, this)
        this.eventHelper.addListener(EVENTS.PLAYER_DEAD, this.playerDeadNote, this)
        this.eventHelper.addListener(EVENTS.GAME_RESTART, this.init, this)
    }

    private init() {
        this.coinCounter?.nearTextCoin.destroy(true)
        this.coinCounter?.textTexture.destroy(true)
        this.timeCounter?.timeText.destroy(true)

        this.coinCounter = new CoinCounter(this.scene, 0)
        this.timeCounter = new TimeCounter(this.scene, this.coinCounter.nearTextCoin.height)

        this.notes.forEach(note => note.note?.destroy(true))
        this.notes = []
    }

    private handleAddNote(note: string, warning: boolean = false, duration: number = 10000) {
        const warningColor = 0xEF3A0C
        const okColor = 0x5eb138
        const noteInstance = new Note(this.scene)

        noteInstance.showNote(note, "center", 0)
        noteInstance.note?.setTintFill(warning ? warningColor : okColor)
        noteInstance.destroyAfter(duration)

        this.notes.push(noteInstance)
        this.drawNotes()
    }

    private drawNotes() {
        this.notes = this.notes.filter(note => note.note !== undefined)
        this.notes.forEach((note, i) => {
            const y = note.note!.height * i
            const x = (this.scene.renderer.width / 2) - (note.note!.width / 2)
            note.note?.setOrigin(0, 0)
            note.note?.setPosition(x, y)
        })
    }

    private playerDeadNote() {
        //CLEANUP
        this.notes.forEach(note => {
            if (note.note) {
                note.note.destroy(true)
            }
        })
        this.notes = []

        const gameOverNote = new Note(this.scene)
        const restartNote = new Note(this.scene)

        gameOverNote.showNote("GAME OVER", 0, 0)
        restartNote.showNote(`Press "R" for restart`, 0, 0)

        gameOverNote.note?.setOrigin(0.5, 0.5)
        gameOverNote.note?.setScale(4, 4)
        gameOverNote.note?.setTintFill(0xEF3A0C)

        restartNote.note?.setOrigin(0.5, 0.5)
        restartNote.note?.setScale(2, 2)
        restartNote.note?.setTintFill(0xEF3A0C)

        this.notes.push(gameOverNote)
        this.notes.push(restartNote)

        let cumulativeHeight = 0
        this.notes.forEach(n => { cumulativeHeight = cumulativeHeight + n.note!.height })

        gameOverNote.note?.setPosition(this.scene.renderer.width / 2, (this.scene.renderer.height / 2) - cumulativeHeight / 2)
        restartNote.note?.setPosition(this.scene.renderer.width / 2, (this.scene.renderer.height / 2))
    }
}