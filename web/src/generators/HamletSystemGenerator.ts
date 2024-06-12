//import { Scene } from "phaser";
import { IPlatformGenerator } from "../interfaces/_index";
import { GeneratorBase } from "./GeneratorBase";

/*const NODE_STATES = {
    NEGATIVE: "negative",
    NEUTRAL: "medium",
    POSITIVE: "positive"
}
const NODE_NAMES = {
    COINS: "coins",
    TIME: "time",
    LIVES: "lives",
    SPEED: "speed",
    DIFFICULTY: "difficulty",
}

type CptRow = { [state: string]: number }
type CptCount = {
    coins: CptRow
    time: CptRow
    lives: CptRow
    speed: CptRow
    difficulty: CptRow
}
type Scenario = { coins: string, time: string, lives: string, speed: string, difficulty: string }

const { POSITIVE, NEGATIVE, NEUTRAL } = NODE_STATES
const scenarios: Scenario[] = [
    { coins: POSITIVE, time: POSITIVE, lives: POSITIVE, speed: POSITIVE, difficulty: POSITIVE },
    { coins: NEUTRAL, time: POSITIVE, lives: POSITIVE, speed: POSITIVE, difficulty: POSITIVE },
    { coins: NEGATIVE, time: POSITIVE, lives: POSITIVE, speed: POSITIVE, difficulty: POSITIVE },
    { coins: POSITIVE, time: NEUTRAL, lives: POSITIVE, speed: POSITIVE, difficulty: NEUTRAL },
    { coins: POSITIVE, time: NEGATIVE, lives: POSITIVE, speed: POSITIVE, difficulty: NEUTRAL },
    { coins: POSITIVE, time: NEGATIVE, lives: NEUTRAL, speed: NEUTRAL, difficulty: NEGATIVE },
    { coins: NEUTRAL, time: POSITIVE, lives: NEGATIVE, speed: NEGATIVE, difficulty: NEGATIVE },
    { coins: NEUTRAL, time: NEUTRAL, lives: POSITIVE, speed: POSITIVE, difficulty: POSITIVE },
    { coins: NEUTRAL, time: NEGATIVE, lives: NEUTRAL, speed: POSITIVE, difficulty: NEGATIVE },
    { coins: NEUTRAL, time: NEGATIVE, lives: POSITIVE, speed: NEUTRAL, difficulty: POSITIVE },
    { coins: NEGATIVE, time: NEUTRAL, lives: POSITIVE, speed: NEGATIVE, difficulty: POSITIVE },
    { coins: NEGATIVE, time: NEUTRAL, lives: POSITIVE, speed: NEUTRAL, difficulty: POSITIVE },
    { coins: POSITIVE, time: POSITIVE, lives: NEUTRAL, speed: NEGATIVE, difficulty: POSITIVE },
    { coins: NEGATIVE, time: NEGATIVE, lives: POSITIVE, speed: NEGATIVE, difficulty: NEGATIVE },
    { coins: POSITIVE, time: NEUTRAL, lives: NEUTRAL, speed: POSITIVE, difficulty: POSITIVE },
]

//PERFORMANCE - NEGATIVE => lover diff, NEUTRAL - nothing, POSITIVE - increase diff
const stateArray = [NEGATIVE, NEUTRAL, POSITIVE]*/



export class HamletSystemGenerator extends GeneratorBase implements IPlatformGenerator {
    generate() { return [] }
    /* private graph: JGraph;
     private coinsNode: JNode;
     private timeNode: JNode;
     private livesNode: JNode;
     private speedNode: JNode;
     private difficultyNode: JNode;
 
     private cpts: CptCount;
 
     constructor(manager: IPlatformManager, scene: Scene) {
         super(manager, scene)
 
         this.graph = bayes.newGraph()
         this.graph.saveSamples = true
 
         this.coinsNode = this.graph.addNode(NODE_NAMES.COINS, stateArray)
         this.timeNode = this.graph.addNode(NODE_NAMES.TIME, stateArray)
         this.livesNode = this.graph.addNode(NODE_NAMES.LIVES, stateArray)
         this.difficultyNode = this.graph.addNode(NODE_NAMES.DIFFICULTY, stateArray)
         this.speedNode = this.graph.addNode(NODE_NAMES.SPEED, stateArray)
 
         this.difficultyNode.addParent(this.coinsNode)
         this.difficultyNode.addParent(this.timeNode)
         this.difficultyNode.addParent(this.livesNode)
         this.difficultyNode.addParent(this.speedNode)
 
         this.cpts = this.computeCpt()
     }
 
     private computeCpt(): CptCount {
         let cpt: CptCount = {
             coins: {
                 positive: 0,
                 medium: 0,
                 negative: 0
             },
             time: {
                 positive: 0,
                 medium: 0,
                 negative: 0
             },
             lives: {
                 positive: 0,
                 medium: 0,
                 negative: 0
             },
             speed: {
                 positive: 0,
                 medium: 0,
                 negative: 0
             },
             difficulty: {
                 positive: 0,
                 medium: 0,
                 negative: 0
             },
         }
 
         scenarios.forEach((scenario) => {
             const { coins, time, lives, speed, difficulty } = scenario
 
             cpt.coins[coins]++
             cpt.time[time]++
             cpt.lives[lives]++
             cpt.speed[speed]++
             cpt.difficulty[difficulty]++
         })
 
         let coinsCpt: CptRow = { positive: 0, medium: 0, negative: 0 }
         let timeCpt: CptRow = { positive: 0, medium: 0, negative: 0 }
         let livesCpt: CptRow = { positive: 0, medium: 0, negative: 0 }
         let speedCpt: CptRow = { positive: 0, medium: 0, negative: 0 }
         let difficultyCpt: CptRow = { positive: 0, medium: 0, negative: 0 }
 
         for (const state in cpt.coins) {
             coinsCpt[state] = cpt.coins[state] / scenarios.length
         }
         for (const state in cpt.time) {
             timeCpt[state] = cpt.time[state] / scenarios.length
         }
         for (const state in cpt.lives) {
             livesCpt[state] = cpt.lives[state] / scenarios.length
         }
         for (const state in cpt.speed) {
             speedCpt[state] = cpt.speed[state] / scenarios.length
         }
         for (const state in cpt.difficulty) {
             difficultyCpt[state] = cpt.difficulty[state] / scenarios.length
         }
 
         return { coins: coinsCpt, time: timeCpt, lives: livesCpt, speed: speedCpt, difficulty: difficultyCpt }
     }
 
     public generate() {
         const coinsValue = NEGATIVE
         const timeValue = NEGATIVE
         const livesValue = NEGATIVE
 
         this.graph.observe(NODE_NAMES.COINS, coinsValue)
         this.graph.observe(NODE_NAMES.TIME, timeValue)
         this.graph.observe(NODE_NAMES.LIVES, livesValue)
 
         this.graph.sample(1000)
 
         this.coinsNode.cpt = [this.cpts.coins[NODE_STATES.NEGATIVE], this.cpts.coins[NODE_STATES.NEGATIVE], this.cpts.coins[NODE_STATES.POSITIVE]]
         this.timeNode.cpt = [this.cpts.time[NODE_STATES.NEGATIVE], this.cpts.time[NODE_STATES.NEGATIVE], this.cpts.time[NODE_STATES.POSITIVE]]
         this.livesNode.cpt = [this.cpts.lives[NODE_STATES.NEGATIVE], this.cpts.lives[NODE_STATES.NEGATIVE], this.cpts.lives[NODE_STATES.POSITIVE]]
         this.speedNode.cpt = [this.cpts.speed[NODE_STATES.NEGATIVE], this.cpts.speed[NODE_STATES.NEGATIVE], this.cpts.speed[NODE_STATES.POSITIVE]]
         // this.difficultyNode = []
 
         return []
     }*/
}