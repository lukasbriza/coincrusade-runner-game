import { sendLogsToApi } from "../../api/_index";
import { GAME_PARAMETERS } from "../../configurations/parameters";
import { ChangeTypes, IChunkLog, IGameState } from "../../interfaces/_index";


export class GameState implements IGameState {
    private pickedCoins: number = 0;
    private generatedCoins: number = 0;
    private overcomedSlopes: number = 0;
    private lostLives: number = 0;
    public actualLives: number = GAME_PARAMETERS.maxPlayerLives;
    public elapsedSeconds: number = 0;
    public gainedSeconds: number = 0;

    private difficultyScore: number = 0;

    private lastChunkElapsedSeconds: number = 0;
    private lastChunkGainedSeconds: number = 0;
    private lastChunkLostLives: number = 0;
    private lastChunkPickedCoins: number = 0;
    private lastChunkGeneratedCoins: number = 0;
    private lastChunkMapDifficulties: number[] = [];
    private lastChunkSuggestedAction?: "increase" | "decrease" | "neutral" = undefined;
    private lastChunkChange?: ChangeTypes = undefined;

    public chunksData: IChunkLog[] = [];
    public playerIsDead: boolean = false;

    public incrementPickedCoin(): void {
        this.pickedCoins++
        this.lastChunkPickedCoins++
    }
    public incrementGeneratedCoin(): void {
        this.generatedCoins++
        this.lastChunkGeneratedCoins++
    }
    public incrementOvercomedSlopes(): void {
        this.overcomedSlopes++
    }
    public incrementLostLives(): void {
        this.lostLives++
        this.lastChunkLostLives++
    }
    public incrementElapsedSeconds(): void {
        this.elapsedSeconds++
        this.lastChunkElapsedSeconds++
    }
    public incrementGainedSeconds(by: number = 1): void {
        this.gainedSeconds = this.gainedSeconds + by
        this.lastChunkGainedSeconds = this.lastChunkGainedSeconds + by
    }
    public logMapDifficulty(diff: number): void {
        this.lastChunkMapDifficulties.push(diff)
    }
    public logSuggestedAction(action: "increase" | "decrease" | "neutral"): void {
        this.lastChunkSuggestedAction = action
    }
    public incrementDifficultyScore() {
        this.difficultyScore++
    }
    public decreaseDifficultyScore() {
        this.difficultyScore--
    }
    public setParameterChange(change: ChangeTypes) {
        this.lastChunkChange = change
    }
    //CHUNK METHODS
    public saveChunk(): void {
        const log: IChunkLog = {
            lostLives: this.lastChunkLostLives,
            elapsedSeconds: this.lastChunkElapsedSeconds,
            gainedSeconds: this.lastChunkGainedSeconds,
            pickedCoins: this.lastChunkPickedCoins,
            generatedCoins: this.lastChunkGeneratedCoins,
            mapDifficulties: this.lastChunkMapDifficulties,
            mapSkillFactor: window.configurationManager.skillFactor,
            platformSpeed: window.configurationManager.platformStartSpeed,
            totalElapsedSeconds: window.gameState.elapsedSeconds,
            totalGainedSeconds: window.gameState.gainedSeconds,
            suggestedAction: this.lastChunkSuggestedAction,
            engine: window.configurationManager.currentGenerator,
            changed: this.lastChunkChange,
            actualDifficultySkore: this.difficultyScore,
            created: new Date()
        }
        this.chunksData.push(log)
        this.resetLastChunkData()
        console.log("chunkSaved", this.getState())
    }
    private resetLastChunkData(): void {
        this.lastChunkElapsedSeconds = 0
        this.lastChunkGainedSeconds = 0
        this.lastChunkLostLives = 0
        this.lastChunkPickedCoins = 0
        this.lastChunkGeneratedCoins = 0
        this.lastChunkMapDifficulties = []
        this.lastChunkSuggestedAction = undefined
        this.lastChunkChange = undefined
    }
    public getState() {
        return {
            pickedCoins: this.pickedCoins,
            generatedCoins: this.generatedCoins,
            overcomedSlopes: this.overcomedSlopes,
            lostLives: this.lostLives,
            elapsedSeconds: this.elapsedSeconds,
            gainedSeconds: this.gainedSeconds,
            lastChunkElapsedSeconds: this.lastChunkElapsedSeconds,
            lastChunkGainedSeconds: this.lastChunkGainedSeconds,
            lastChunkLostLives: this.lastChunkLostLives,
            lastChunkPickedCoins: this.lastChunkPickedCoins,
            lastChunkGeneratedCoins: this.lastChunkGeneratedCoins,
            chunksData: this.chunksData
        }
    }
    public getLastChunk(): IChunkLog | undefined {
        if (this.chunksData.length === 0) return undefined
        return this.chunksData[this.chunksData.length - 1]
    }
    public getLastTwoChunks(): IChunkLog[] | undefined {
        if (this.chunksData.length < 2) return undefined
        return [this.chunksData[this.chunksData.length - 2], this.chunksData[this.chunksData.length - 1]]
    }
    public setPlayerDead(): void {
        this.playerIsDead = true
        console.log(this.getState())
        if (GAME_PARAMETERS.sendLogs) {
            sendLogsToApi(this.chunksData)
        }
    }
    public gameStateRestart() {
        if (this.playerIsDead) {
            this.resetLastChunkData()
            this.pickedCoins = 0
            this.generatedCoins = 0
            this.overcomedSlopes = 0
            this.lostLives = 0
            this.elapsedSeconds = 0
            this.gainedSeconds = 0
            this.difficultyScore = 0
            this.playerIsDead = false
            this.chunksData = []
        }
    }
}