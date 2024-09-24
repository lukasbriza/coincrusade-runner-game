import { IGeneratorParameters } from "../interfaces/_index";

export const getChangeDistributions = (params: IGeneratorParameters) => {
    return [
        params.changeDistribution.coinChance,
        params.changeDistribution.platformSpeed,
        params.changeDistribution.platformDifficulty
    ]
}