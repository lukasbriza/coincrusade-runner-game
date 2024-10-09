import { gsap } from 'gsap'

export const mountModal = (target: gsap.TweenTarget) => {
  const tl = gsap.timeline()
  tl.set(target, { display: 'flex', opacity: 0 }).fromTo(
    target,
    { opacity: 0 },
    { opacity: 1, duration: 0.25, ease: 'power2.inOut' },
  )
  return tl
}

export const unmountModal = (target: gsap.TweenTarget) => {
  const tl = gsap.timeline()
  tl.fromTo(target, { opacity: 1 }, { opacity: 0, duration: 0.25, ease: 'power2.inOut' }).set(target, {
    display: 'none',
    opacity: 0,
  })
  return tl
}
