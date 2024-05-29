import { IGameState } from "../../interfaces/_index";

export class GameState implements IGameState {
    private pickedCoins: number = 0;
    private generatedCoins: number = 0;
    private overcomedSlopes: number = 0;
    private lostLives: number = 0;

    public incrementPickedCoin(): void {
        this.pickedCoins++
    }
    public incrementGeneratedCoin(): void {
        this.generatedCoins++
    }
    public incrementOvercomedSlopes(): void {
        this.overcomedSlopes++
    }
    public incrementLostLives(): void {
        this.lostLives++
    }
    public getState() {
        return {
            pickedCoins: this.pickedCoins,
            generatedCoins: this.generatedCoins,
            overcomedSlopes: this.overcomedSlopes,
            lostLives: this.lostLives
        }
    }
}