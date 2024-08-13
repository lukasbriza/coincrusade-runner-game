import { Scene } from "phaser";
import { CoinCounter } from "./CoinCounter";
import { TimeCounter } from "./TimeCounter";
import { LifeCounter } from "./LifeCounter";
import { EVENTS } from "../../constants";
import { Note } from "./Note";
import { IPlayerStatus } from "../../interfaces/_index";
import { Eventhelper } from "../../helpers/_index";
import { GAME_PARAMETERS } from "../../configurations/_index";

export class PlayerStatus implements IPlayerStatus {
    public coinCounter: CoinCounter;
    public timeCounter: TimeCounter;
    public lifeCounter: LifeCounter;

    private scene: Scene;
    private eventHelper: Eventhelper;
    private notes: Note[] = [];

    private generatorNote: Note;
    private restartNotes: Note[] = []

    constructor(scene: Scene) {
        this.scene = scene
        this.lifeCounter = new LifeCounter(scene)
        this.addGeneratorNote()
        this.init()

        this.eventHelper = new Eventhelper(scene)
        this.eventHelper.addListener(EVENTS.ADD_NOTE, this.handleAddNote, this)
        this.eventHelper.addListener(EVENTS.DESTROY_NOTE, this.drawNotes, this)
        this.eventHelper.addListener(EVENTS.PLAYER_DEAD, this.playerDeadNote, this)
        this.eventHelper.addListener(EVENTS.GAME_RESTART, this.reset, this)
    }

    private init() {
        this.coinCounter = new CoinCounter(this.scene, 0)
        this.timeCounter = new TimeCounter(this.scene, this.coinCounter.nearTextCoin.height)

        this.notes.forEach(note => note.note?.destroy(true))
        this.notes = []
    }

    private reset() {
        location.reload()
    }

    private addGeneratorNote() {
        this.generatorNote = new Note(this.scene);
        this.generatorNote.showNote(
            window.configurationManager.currentGenerator,
            this.scene.renderer.width / 2,
            this.scene.renderer.height - 70
        )
        this.generatorNote.note?.setDepth(100)
    }

    private handleAddNote(note: string, warning: boolean = false, duration: number = 10000) {
        if (GAME_PARAMETERS.debug && !warning) {
            const warningColor = 0xEF3A0C
            const okColor = 0x5eb138
            const noteInstance = new Note(this.scene)

            noteInstance.showNote(note, "center", 0)
            noteInstance.note?.setTintFill(warning ? warningColor : okColor)
            noteInstance.destroyAfter(duration)

            this.notes.push(noteInstance)
            this.drawNotes()
        }
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

        const gameOverNote = new Note(this.scene)
        const restartNote = new Note(this.scene)
        const quitNote = new Note(this.scene)

        gameOverNote.showNote("GAME OVER", 0, 0)
        restartNote.showNote(`Stiskni "R" pro restart`, 0, 0)
        quitNote.showNote(`Pro odchod ze hry stiskni "Q"`, 0, 0)


        gameOverNote.note?.setOrigin(0.5, 0.5)
        gameOverNote.note?.setScale(4, 4)
        gameOverNote.note?.setTintFill(0xEF3A0C)
        gameOverNote.note?.setDepth(100)

        restartNote.note?.setOrigin(0.5, 0.5)
        restartNote.note?.setScale(2, 2)
        restartNote.note?.setTintFill(0xEF3A0C)
        restartNote.note?.setDepth(100)

        quitNote.note?.setOrigin(0.5, 0.5)
        quitNote.note?.setScale(2, 2)
        quitNote.note?.setTintFill(0xEF3A0C)
        quitNote.note?.setDepth(100)

        restartNote.note?.setPosition(this.scene.renderer.width / 2, (this.scene.renderer.height / 2))
        gameOverNote.note?.setPosition(this.scene.renderer.width / 2, (this.scene.renderer.height / 2) - (restartNote.note?.height ?? 0))
        quitNote.note?.setPosition(this.scene.renderer.width / 2, (this.scene.renderer.height / 2) + ((restartNote.note?.height ?? 0) / 2) + 10)

        this.restartNotes.push(gameOverNote)
        this.restartNotes.push(restartNote)
    }
}