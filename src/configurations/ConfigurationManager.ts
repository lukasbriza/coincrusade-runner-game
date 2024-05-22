import { IConfigurationManager, IGeneratorParameters } from "../interfaces/_index";
import { ALL_PLATFORMS_TEST_GENERATOR_PARAMETERS, ENDLESS_PLAIN_GENERATOR_PARAMETERS, GAME_PARAMETERS } from "./parameters";

export class ConfigurationManager implements IConfigurationManager {
    public maxPlatauCount: number;
    public minPlatauCount: number;
    public coinGenerationChance: number;
    public chestGenerationChance: number;
    public platformStartSpeed: number = GAME_PARAMETERS.platformStartSpeed;

    constructor() {
        const params = this.resolveGeneratorParameters()
        this.maxPlatauCount = params.maxPlatauCount
        this.minPlatauCount = params.minPlatauCount
        this.coinGenerationChance = params.coinGenerationChance
        this.chestGenerationChance = params.chestGenerationChance
    }
    private resolveGeneratorParameters(): IGeneratorParameters {
        switch (GAME_PARAMETERS.currentGenerator) {
            case "AllTest":
                return ALL_PLATFORMS_TEST_GENERATOR_PARAMETERS
            case "Endless":
                return ENDLESS_PLAIN_GENERATOR_PARAMETERS
        }
    }

    //PLATAU
    public increaseMaxPlatauCount(by?: number) {
        this.maxPlatauCount = this.maxPlatauCount + (by ?? 0)
        return this.maxPlatauCount
    }
    public decreaseMaxPlatauCount(by?: number) {
        const temp = this.maxPlatauCount - (by ?? 1)
        this.maxPlatauCount = temp < this.minPlatauCount ? this.minPlatauCount : temp
        return this.maxPlatauCount
    }
    public increaseMinPlatauCount(by?: number) {
        const temp = this.minPlatauCount + (by ?? 1)
        this.minPlatauCount = temp > this.maxPlatauCount ? this.maxPlatauCount : temp
        return this.minPlatauCount
    }
    public decreaseMinPlatauCount(by?: number) {
        this.minPlatauCount = this.minPlatauCount - (by ?? 1)
        return this.minPlatauCount
    }

    //COIN CHANCE
    public increaseCoinGenerationChance(by?: number) {
        const maxChance = this.resolveGeneratorParameters().maxCoinGenerationChance
        const temp = this.coinGenerationChance + (by ?? 0.1)
        this.coinGenerationChance = temp > maxChance ? maxChance : temp
        return this.coinGenerationChance
    }
    public decreaseCoinGenerationChance(by?: number) {
        const minChance = this.resolveGeneratorParameters().minCoinGenerationChance
        const temp = this.coinGenerationChance - (by ?? 0.1)
        this.coinGenerationChance = temp < minChance ? minChance : temp
        return this.coinGenerationChance
    }

    //CHEST CHANCE
    public increaseChestGenerationChance(by?: number) {
        const maxChance = this.resolveGeneratorParameters().maxChestGenerationChance
        const temp = this.chestGenerationChance + (by ?? 0.1)
        this.chestGenerationChance = temp > maxChance ? maxChance : temp
        return this.chestGenerationChance
    }
    public decreaseChestGenerationChance(by?: number) {
        const minChance = this.resolveGeneratorParameters().minChestGenerationChance
        const temp = this.chestGenerationChance - (by ?? 0.1)
        this.chestGenerationChance = temp < minChance ? minChance : temp
        return this.chestGenerationChance
    }

    //PLATFORM SPEED
    public increasePlatformSpeed(by?: number) {
        this.platformStartSpeed = this.platformStartSpeed + (by ?? 5)
        return this.platformStartSpeed
    }
    public decreasePlatformSpeed(by?: number) {
        const temp = this.platformStartSpeed - (by ?? 5)
        this.platformStartSpeed = temp < GAME_PARAMETERS.minimalPlatformSpeed ? GAME_PARAMETERS.minimalPlatformSpeed : temp
        return this.platformStartSpeed
    }
}