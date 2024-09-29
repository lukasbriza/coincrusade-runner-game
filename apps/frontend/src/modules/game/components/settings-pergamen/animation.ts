import gsap from 'gsap'

export const fadeOff = (content: gsap.TweenTarget) => {
  const tl = gsap.timeline()

  tl.addLabel('start').to(
    content,
    {
      opacity: 0,
      ease: 'power1.inOut',
      duration: 0.5,
    },
    'start',
  )

  return tl
}

export const fadeIn = (content: gsap.TweenTarget) => {
  const tl = gsap.timeline()

  tl.addLabel('start').to(
    content,
    {
      opacity: 1,
      ease: 'power1.inOut',
      duration: 0.5,
    },
    'start',
  )

  return tl
}
