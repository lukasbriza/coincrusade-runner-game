export const isMobile = () => {
  const result = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  return result
}
