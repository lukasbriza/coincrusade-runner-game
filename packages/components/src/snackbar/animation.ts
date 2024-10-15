import gsap from 'gsap'

export const showSnackbar = (target: gsap.TweenTarget) => {
  const tl = gsap.timeline()
  tl.set(target, { opacity: 0, y: -20, scale: 0.5 })
    .addLabel('start')
    .to(target, { opacity: 1, scale: 1, duration: 0.5, ease: 'power1.out' }, 'start')
    .to(
      target,
      {
        duration: 0.5,
        y: 0,
        ease: 'power1.out',
        onComplete: () => {
          gsap.set(target, { clearProps: 'scale' })
          gsap.set(target, { clearProps: 'transform' })
        },
      },
      'start',
    )
  return tl
}

export const hideSnackbar = (target: gsap.TweenTarget) => {
  const tl = gsap.timeline()
  tl.set(target, { opacity: 1 })
    .addLabel('start')
    .to(target, { opacity: 0, y: -20, scale: 0.5, duration: 0.5, ease: 'power1.out' }, 'start')
  return tl
}

export const snackbarMouseEnter = (target: gsap.TweenTarget) => {
  const tl = gsap.timeline()
  tl.to(target, { x: -1, y: -1, duration: 0.2, ease: 'power1.out' })
  return tl
}

export const snackbarMouseLeave = (target: gsap.TweenTarget) => {
  const tl = gsap.timeline()
  tl.to(target, { x: 0, y: 0, duration: 0.2, ease: 'power1.out' })
  return tl
}
