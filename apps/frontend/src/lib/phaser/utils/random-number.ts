export const randomNumber = (minimal: number, maximal: number, round: boolean) => {
  const number = Math.random() * (maximal - minimal) + minimal
  const precisionNumber = number.toString().split('.')[1]

  if (!round) {
    return number
  }

  if (Number(precisionNumber[0]) >= 5) {
    return Math.ceil(number)
  }
  return Math.floor(number)
}
