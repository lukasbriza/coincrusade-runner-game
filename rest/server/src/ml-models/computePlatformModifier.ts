export const computePlatformModifier = (maxPenalty: number, maxPlatformSpeed: number, platformSpeed: number) => {
    return maxPenalty - (maxPenalty / maxPlatformSpeed) * (maxPlatformSpeed - platformSpeed)
}