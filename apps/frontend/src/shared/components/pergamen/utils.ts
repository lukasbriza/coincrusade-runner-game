export const getOpenedPergamenTopPosition = (
  pergamenElement: HTMLImageElement,
  pergamentTopElement: HTMLImageElement,
) => {
  const parentHeight = pergamenElement.parentElement?.clientHeight || 0
  const gapFromTop = (parentHeight - pergamenElement.height) / 2
  const pergamenOpenTopPosition = gapFromTop - pergamentTopElement.height / 2
  return pergamenOpenTopPosition
}

export const getOpenedRibbonTopPosition = (pergamenElement: HTMLImageElement, pergamentTopElement: HTMLImageElement) =>
  getOpenedPergamenTopPosition(pergamenElement, pergamentTopElement) + 10

export const getTopBottomPergamenWith = (pergamenElement: HTMLImageElement) => {
  const pergamenWidth = pergamenElement.width
  return pergamenWidth + pergamenWidth * 0.2
}

export const getOpenedPergamenBottomPosition = (
  pergamenElement: HTMLImageElement,
  pergamenBottomElement: HTMLImageElement,
) => {
  const parentHeight = pergamenElement.parentElement?.clientHeight || 0
  const gapFromTop = (parentHeight - pergamenElement.height) / 2
  const pergamenOpenBottomPosition = gapFromTop + pergamenElement.height - pergamenBottomElement.height / 2
  return pergamenOpenBottomPosition
}
