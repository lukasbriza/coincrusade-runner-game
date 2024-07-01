import { GAME_PARAMETERS, REINFORCEMENT_LEARNING_GENERATOR } from "../configurations/_index";
import { DIFF_POLICY, POOL_CONFIG } from "../constants";
import { IChunkLog, IPlatformGenerator, MapTypeExtended } from "../interfaces/_index";
import { generateMap, getChangeDistributions, pickBasedOnWeights } from "../utils/_index";
import { GeneratorBase } from "./GeneratorBase"
import * as _ from "lodash-es";

type State = {
    coinRatio: number
    timeRatio: number
    liveRatio: number
}
//[INCREASE Q,DECREASE Q]
type QTableType = { [key: string]: [number, number] }

export class ReinforcementLearningGenerator extends GeneratorBase implements IPlatformGenerator {
    private QTable: QTableType = {};
    private alpha: number = 0.1; //learning rate
    private gamma: number = 0.9; //discont factor
    private epsilon: number = 0.2; //discovery ratio

    public async generate() {
        //SETUP
        const chunks = window.gameState.getLastTwoChunks()
        const finalMaps: MapTypeExtended[] = []
        let maxLenght = POOL_CONFIG.maxChunkPackageWidth
        let lenght = 0

        //INITIAL STATE
        const initialState = this.stateToKey({ coinRatio: 1, liveRatio: 1, timeRatio: 1 })
        if (!this.QTable[initialState]) {
            this.QTable[initialState] = [1, 0]
        }

        //ADJUSTMENT DISTRIBUTION CHANCES
        const factorDistributions = getChangeDistributions(REINFORCEMENT_LEARNING_GENERATOR)
        const pickIndex = pickBasedOnWeights(factorDistributions)

        //FIRST CHUNK FLOW
        if (!chunks) {
            console.log("Not enough chunks.")
            this.applyDifficultyIncreasePolicy(pickIndex)
            generateMap(this, finalMaps, lenght, maxLenght)
            return finalMaps
        }

        //GET PREV STATE
        const state = this.getState(chunks[0])
        //GET ACTION BASED ON PREV STATE
        const action = this.chooseAction(state)
        //GET ACTUAL STATE
        const nextState = this.getState(chunks[1])
        //GET REWARD
        const reward = this.calculateReward(state)
        //Q LEARNING
        this.qLearning(state, nextState, action, reward)

        //ADJUSTMENT
        switch (action) {
            case DIFF_POLICY.INCREASE:
                this.applyDifficultyIncreasePolicy(pickIndex)
                break;
            default:
                this.applyDifficultyDecreasePolicy(pickIndex)
                break;
        }

        //MAP GENERATION
        console.log(this.QTable)
        generateMap(this, finalMaps, lenght, maxLenght)
        return finalMaps
    }

    private qLearning(state: State, nextState: State, action: DIFF_POLICY, reward: number) {
        const stateKey = this.stateToKey(state)
        const nextStateKey = this.stateToKey(nextState)
        this.initializeQ(stateKey)
        this.initializeQ(nextStateKey)

        const maxQOfNextState = this.getMaxQ(nextStateKey)
        const actionIndex = action === DIFF_POLICY.INCREASE ? 0 : 1

        this.QTable[stateKey][actionIndex] += this.alpha * (reward + this.gamma * maxQOfNextState - this.QTable[stateKey][actionIndex])
    }

    //CHOOSE ACTION USING EPSILON GREEDY STRATEGY
    private chooseAction(state: State): DIFF_POLICY {
        //PROPABILITY TO CHOOSE RANDOM ACTION
        if (Math.random() < this.epsilon) {
            console.log("Choosed exploration.")
            return _.sample([DIFF_POLICY.DECREASE, DIFF_POLICY.INCREASE])
        }
        //GET ACTION FROM QTABLE
        const stateKey = this.stateToKey(state)
        const hasKey = Object.keys(this.QTable).find(k => k === stateKey)
        if (hasKey) {
            console.log("Choosed best action from QTable.", this.QTable[stateKey])
            return this.QTable[stateKey][0] > this.QTable[stateKey][1] ? DIFF_POLICY.INCREASE : DIFF_POLICY.DECREASE
        }
        //RETURN RANDOM ACTION
        console.log("If dont know best action, choose random.")
        return _.sample([DIFF_POLICY.DECREASE, DIFF_POLICY.INCREASE])
    }

    private stateToKey({ coinRatio, liveRatio, timeRatio }: State): string {
        return `${coinRatio.toFixed(1)}-${liveRatio.toFixed(1)}-${timeRatio.toFixed(1)}`
    }

    //GET MAX Q VALUE OF STATE
    private getMaxQ(qTableKey: string) {
        const actions = this.QTable[qTableKey]
        return actions[0] > actions[1] ? actions[0] : actions[1]
    }

    //INIT QSTATE IF UNDEFINED
    private initializeQ(stateKey: string) {
        if (this.QTable[stateKey] === undefined) {
            this.QTable[stateKey] = [0, 0]
        }
    }

    private getState(chunk: IChunkLog): State {
        const coinTemp = chunk.pickedCoins / chunk.generatedCoins
        const coinRatio = coinTemp > 1 ? 1 : coinTemp
        const timeTemp = chunk.gainedSeconds / chunk.elapsedSeconds
        const timeRatio = timeTemp > 1 ? 1 : timeTemp
        const liveRatio = 1 - (chunk.lostLives / GAME_PARAMETERS.maxPlayerLives)
        return { coinRatio, timeRatio, liveRatio }
    }

    private calculateReward(state: State) {
        const rewardMultiplier = 1
        const coinReward = state.coinRatio * rewardMultiplier
        const timeReward = state.timeRatio * rewardMultiplier
        const liveReward = state.liveRatio * rewardMultiplier
        return coinReward + timeReward + liveReward
    }
}