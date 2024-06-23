import * as _ from "lodash-es";

export const pickBasedOnWeights = (weights: number[]) => {
    const arr: number[] = []

    weights.forEach((num, i) => {
        for (let x = 1; x <= num; x++) {
            arr.push(i)
        }
    })

    const shuffled = _.shuffle(arr)
    return _.sample(shuffled) as number
}