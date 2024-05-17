export class GeneratorBase {
    public dropCoin(chance: number): boolean {
        const random = Math.random()
        return random <= chance;
    }
}