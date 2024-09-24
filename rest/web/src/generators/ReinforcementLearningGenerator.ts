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
const possibleParamStates = [0, 0.5, 1]

export class ReinforcementLearningGenerator extends GeneratorBase implements IPlatformGenerator {
    private QTable: QTableType = {};
    private alpha: number = 0.4; //learning rate
    private gamma: number = 0.9; //discont factor
    private epsilon: number = 0.2; //discovery ratio

    public async generate() {
        //SETUP
        const chunks = window.gameState.getLastTwoChunks()
        const finalMaps: MapTypeExtended[] = []
        let maxLenght = POOL_CONFIG.maxChunkPackageWidth
        let lenght = 0

        //INITIAL STATE
        const initialState1 = this.stateToKey({ coinRatio: 1, liveRatio: 1, timeRatio: 1 })
        const initialState2 = this.stateToKey({ coinRatio: 0, liveRatio: 0, timeRatio: 0 })
        if (!this.QTable[initialState1]) {
            this.QTable[initialState1] = [1, 0]
        }
        if (!this.QTable[initialState2]) {
            this.QTable[initialState2] = [0, 1]
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
        //GET ACTUAL STATE
        const nextState = this.getState(chunks[1])
        //GET ACTION BASED ON PREV STATE
        const action = this.chooseAction(state /*nextState, chunks[0].suggestedAction*/)
        //GET REWARD
        const reward = this.calculateReward(state, nextState)
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

        this.QTable[stateKey][actionIndex] = this.QTable[stateKey][actionIndex] + this.alpha * (reward + (this.gamma * maxQOfNextState - this.QTable[stateKey][actionIndex]))
    }

    //CHOOSE ACTION USING EPSILON GREEDY STRATEGY
    private chooseAction(state: State): DIFF_POLICY {
        //PROPABILITY TO CHOOSE RANDOM ACTION
        if (Math.random() < this.epsilon) {
            return _.sample([DIFF_POLICY.DECREASE, DIFF_POLICY.INCREASE])
        }
        //GET ACTION FROM QTABLE
        const stateKey = this.stateToKey(state)
        const hasKey = Object.keys(this.QTable).find(k => k === stateKey)
        if (hasKey) {
            return this.QTable[stateKey][0] > this.QTable[stateKey][1] ? DIFF_POLICY.INCREASE : DIFF_POLICY.DECREASE
        }
        //RETURN RANDOM ACTION
        return _.sample([DIFF_POLICY.DECREASE, DIFF_POLICY.INCREASE])
    }

    private stateToKey({ coinRatio, liveRatio, timeRatio }: State): string {

        const stateConvert = (num: number) => {
            if (num <= 0.33) {
                return possibleParamStates[0]
            }
            if (num > 0.67) {
                return possibleParamStates[2]
            }
            return possibleParamStates[1]
        }

        return `${stateConvert(coinRatio)}-${stateConvert(liveRatio)}-${stateConvert(timeRatio)}`
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

    private calculateReward(state: State, nextState: State) {
        /*
        const rewardMultiplier = 1
        const coinReward = state.coinRatio * rewardMultiplier
        const timeReward = state.timeRatio * rewardMultiplier
        const liveReward = state.liveRatio * rewardMultiplier
        return coinReward + timeReward + liveReward*/
        const stateValue = (state.coinRatio + state.liveRatio + state.timeRatio) / 3
        const nextStateValue = (nextState.coinRatio + nextState.liveRatio + nextState.timeRatio) / 3

        const diffFromOptimalState = stateValue < 0.5 ? 0.5 - stateValue : stateValue - 0.5
        const diffFromOptimalNextState = nextStateValue < 0.5 ? 0.5 - nextStateValue : nextStateValue - 0.5

        //REWARD
        if (diffFromOptimalState >= diffFromOptimalNextState) {
            return (diffFromOptimalState - diffFromOptimalNextState) * 10
        } else {
            //PUNISHMENT
            return - (diffFromOptimalNextState - diffFromOptimalState) * 10
        }
    }
}