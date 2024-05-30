import { IChunkLog, IGameState } from "../../interfaces/_index";

export class GameState implements IGameState {
    private pickedCoins: number = 0;
    private generatedCoins: number = 0;
    private overcomedSlopes: number = 0;
    private lostLives: number = 0;
    private elapsedSeconds: number = 0;
    private gainedSeconds: number = 0;

    private lastChunkElapsedSeconds: number = 0;
    private lastChunkGainedSeconds: number = 0;
    private lastChunkLostLives: number = 0;
    private lastChunkPickedCoins: number = 0;
    private lastChunkGeneratedCoins: number = 0;
    private lastChunkMapDifficulties: number[] = [];

    public chunksData: IChunkLog[] = [];

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
    public incrementGainedSeconds(by: number = 1) {
        this.gainedSeconds = this.gainedSeconds + by
        this.lastChunkGainedSeconds = this.lastChunkGainedSeconds + by
    }
    public logMapDifficulty(diff: number) {
        this.lastChunkMapDifficulties.push(diff)
    }
    //CHUNK METHODS
    public saveChunk() {
        const log: IChunkLog = {
            lostLives: this.lastChunkLostLives,
            elapsedSeconds: this.lastChunkElapsedSeconds,
            gainedSeconds: this.lastChunkGainedSeconds,
            pickedCoins: this.lastChunkPickedCoins,
            generatedCoins: this.lastChunkGeneratedCoins,
            mapDifficulties: this.lastChunkMapDifficulties,
            created: new Date()
        }
        this.chunksData.push(log)
        this.resetLastChunkData()
        console.log("chunkSaved", this.chunksData)
    }
    private resetLastChunkData() {
        this.lastChunkElapsedSeconds = 0
        this.lastChunkGainedSeconds = 0
        this.lastChunkLostLives = 0
        this.lastChunkPickedCoins = 0
        this.lastChunkGeneratedCoins = 0
        this.lastChunkMapDifficulties = []
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
}