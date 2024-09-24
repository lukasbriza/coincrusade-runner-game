export const computePlatformModifier = (maxPenalty: number, maxPlatformSpeed: number, platformSpeed: number) =>
  maxPenalty - (maxPenalty / maxPlatformSpeed) * (maxPlatformSpeed - platformSpeed)
