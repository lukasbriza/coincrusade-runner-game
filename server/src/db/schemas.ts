import { Schema } from "mongoose";
import { GameDataSchemaType } from "../types";

const log = {
    lostLives: { type: Number, required: true },
    elapsedSeconds: { type: Number, required: true },
    gainedSeconds: { type: Number, required: true },
    pickedCoins: { type: Number, required: true },
    generatedCoins: { type: Number, required: true },
    created: { type: Date, required: true },
    mapDifficulties: { type: [Number], required: true },
    mapSkillFactor: { type: Number, required: true },
    platformSpeed: { type: Number, required: true },
    totalElapsedSeconds: { type: Number, required: true },
    totalGainedSeconds: { type: Number, required: true },
    suggestedAction: { type: String, required: false, default: null },
    engine: { type: String, required: true },
    changed: { type: String, required: false, default: null },
    actualDifficultySkore: { type: Number, required: true },
}

export const gameDataSchema = new Schema<GameDataSchemaType>({
    created: { type: Date, required: false, default: new Date().toUTCString() },
    logs: { type: [log], required: true, default: [] }
})
