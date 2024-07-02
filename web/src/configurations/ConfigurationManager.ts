import { Generators, IConfigurationManager, IGeneratorParameters } from "../interfaces/_index";
import { GAME_PARAMETERS, HAMLET_SYSTEM_GENERATOR_PARAMETERS, LINEAR_GENERATOR, NEURAL_NETWORK_GENERATOR, NO_AI_ADAPTIVE_GENERATOR_PARAMETERS, REINFORCEMENT_LEARNING_GENERATOR } from "./parameters";

export class ConfigurationManager implements IConfigurationManager {
    public maxPlatauCount: number;
    public minPlatauCount: number;
    public coinGenerationChance: number;
    public chestGenerationChance: number;
    public platformStartSpeed: number = GAME_PARAMETERS.platformStartSpeed;
    public platauTentChance: number;
    public platauGrassChance: number;
    public platauTreeOrStumpChance: number;
    public maxStumpsAndTreesOnPlatau: number;
    public skillFactor: number;
    public currentGenerator: Generators = "LinearGenerator";

    //CAP
    public isMaxCoinChance: boolean = false
    public isMinCoinchance: boolean = false

    private platformDifficultyPickStepFactor: number;

    constructor() {
        this.getGeneratorNamefromUrl()
        this.setupParams()
    }
    private getGeneratorNamefromUrl(){
        const query = window.location.search
        const params = new URLSearchParams(query)
        const generator = params.get("generator")
        if(generator){
            this.currentGenerator = generator as Generators
            console.log({currentGenerator: this.currentGenerator})
        }
    }
    private setupParams(): void {
        const params = this.resolveGeneratorParameters()
        this.maxPlatauCount = params.maxPlatauCount
        this.minPlatauCount = params.minPlatauCount
        this.coinGenerationChance = params.coinGenerationChance
        this.chestGenerationChance = params.chestGenerationChance
        this.platauTentChance = params.platauTentChance
        this.platauGrassChance = params.platauGrassChance
        this.platauTreeOrStumpChance = params.platauTreeOrStumpChance
        this.maxStumpsAndTreesOnPlatau = params.maxStumpsAndTreesOnPlatau
        this.skillFactor = params.skillFactorDefault
        this.platformDifficultyPickStepFactor = params.platformDifficultyPickStepFactor
    }
    private resolveGeneratorParameters(): IGeneratorParameters {
        switch (this.currentGenerator) {
            case "NoAiAdaptive":
                return NO_AI_ADAPTIVE_GENERATOR_PARAMETERS
            case "HamletSystem":
                return HAMLET_SYSTEM_GENERATOR_PARAMETERS
            case "LinearGenerator":
                return LINEAR_GENERATOR
            case "NeuralNetworkGenerator":
                return NEURAL_NETWORK_GENERATOR
            case "ReinforcementLearningGenerator":
                return REINFORCEMENT_LEARNING_GENERATOR
        }
    }

    //PLATAU
    public increaseMaxPlatauCount(by?: number): number {
        this.maxPlatauCount = this.maxPlatauCount + (by ?? 0)
        return this.maxPlatauCount
    }
    public decreaseMaxPlatauCount(by?: number): number {
        const temp = this.maxPlatauCount - (by ?? 1)
        this.maxPlatauCount = temp < this.minPlatauCount ? this.minPlatauCount : temp
        return this.maxPlatauCount
    }
    public increaseMinPlatauCount(by?: number): number {
        const temp = this.minPlatauCount + (by ?? 1)
        this.minPlatauCount = temp > this.maxPlatauCount ? this.maxPlatauCount : temp
        return this.minPlatauCount
    }
    public decreaseMinPlatauCount(by?: number): number {
        this.minPlatauCount = this.minPlatauCount - (by ?? 1)
        return this.minPlatauCount
    }

    //COIN CHANCE
    public increaseCoinGenerationChance(by?: number): number {
        const maxChance = this.resolveGeneratorParameters().maxCoinGenerationChance
        const temp = this.coinGenerationChance + (by ?? 0.1)
        this.coinGenerationChance = temp > maxChance ? maxChance : temp

        if (this.coinGenerationChance === maxChance) {
            this.isMaxCoinChance = true
        }
        this.isMinCoinchance = false
        return this.coinGenerationChance
    }
    public decreaseCoinGenerationChance(by?: number): number {
        const minChance = this.resolveGeneratorParameters().minCoinGenerationChance
        const temp = this.coinGenerationChance - (by ?? 0.1)
        this.coinGenerationChance = temp < minChance ? minChance : temp
        this.isMaxCoinChance = false

        if (this.coinGenerationChance === minChance) {
            this.isMinCoinchance = true
        }
        return this.coinGenerationChance
    }

    //CHEST CHANCE
    public increaseChestGenerationChance(by?: number): number {
        const maxChance = this.resolveGeneratorParameters().maxChestGenerationChance
        const temp = this.chestGenerationChance + (by ?? 0.1)
        this.chestGenerationChance = temp > maxChance ? maxChance : temp
        return this.chestGenerationChance
    }
    public decreaseChestGenerationChance(by?: number): number {
        const minChance = this.resolveGeneratorParameters().minChestGenerationChance
        const temp = this.chestGenerationChance - (by ?? 0.1)
        this.chestGenerationChance = temp < minChance ? minChance : temp
        return this.chestGenerationChance
    }

    //PLATFORM SPEED
    public increasePlatformSpeed(by?: number): number {
        this.platformStartSpeed = this.platformStartSpeed + (by ?? 5)
        return this.platformStartSpeed
    }
    public decreasePlatformSpeed(by?: number): number {
        const temp = this.platformStartSpeed - (by ?? 5)
        this.platformStartSpeed = temp < GAME_PARAMETERS.minimalPlatformSpeed ? GAME_PARAMETERS.minimalPlatformSpeed : temp
        return this.platformStartSpeed
    }
    public nullifyPlatformSpeed(): void {
        this.platformStartSpeed = 0
    }
    public resetPlatformSpeed(): void {
        this.platformStartSpeed = GAME_PARAMETERS.platformStartSpeed
    }

    //PLATFORM SELECTION
    public increasePickedPlatformDifficulty(by?: number): number {
        this.skillFactor = this.skillFactor + (by ?? this.platformDifficultyPickStepFactor)
        return this.skillFactor
    }
    public decreasePickedPlatformDifficulty(by?: number): number {
        const base = this.resolveGeneratorParameters().skillFactorDefault
        const temp = this.skillFactor - (by ?? this.platformDifficultyPickStepFactor)
        if (temp < base) {
            this.skillFactor = base
        } else {
            this.skillFactor = temp
        }
        return this.skillFactor
    }
}