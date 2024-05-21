export const randomNumber = (min: number, max: number, round: boolean = true) => {
    const number = Math.random() * (max - min) + min;
    const precisionNumber = number.toString().split(".")[1]

    if (!round) return number

    if (Number(precisionNumber[0]) >= 5) {
        return Math.ceil(number)
    }
    return Math.floor(number)
}