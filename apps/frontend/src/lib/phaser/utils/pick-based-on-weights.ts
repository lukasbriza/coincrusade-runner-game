import sample from 'lodash.sample'
import shuffle from 'lodash.shuffle'

export const pickBasedOnWeights = (weights: number[]) => {
  const array: number[] = []

  for (const [index, number] of weights.entries()) {
    for (let x = 1; x <= number; x += 1) {
      array.push(index)
    }
  }

  const shuffled = shuffle(array)
  return sample(shuffled) as number
}
