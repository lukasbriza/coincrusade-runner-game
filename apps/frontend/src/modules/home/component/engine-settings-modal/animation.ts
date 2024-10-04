import { gsap } from 'gsap'

export const fadeInModal = (target: gsap.TweenTarget) => {
  const tl = gsap.timeline()
  tl.fromTo(
    target,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.25,
      ease: 'power2.in',
    },
  )
  return tl
}

export const fadeOffModal = (target: gsap.TweenTarget) => {
  const tl = gsap.timeline()
  tl.to(target, {
    opacity: 0,
    duration: 0.25,
    ease: 'power2.out',
  })
  return tl
}
