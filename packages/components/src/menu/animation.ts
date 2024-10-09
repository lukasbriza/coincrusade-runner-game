import gsap from 'gsap'

import { menuClasses } from './classes'

export const openAnimation = () => {
  const openTl = gsap.timeline()
  openTl
    .addLabel('start')
    .to(
      `.${menuClasses.modal}`,
      {
        width: '100vw',
        duration: 1.5,
        ease: 'power2.inOut',
      },
      'start',
    )
    .addLabel('items')
    .set(
      `.${menuClasses.menuItem}`,
      {
        display: 'initial',
      },
      'items',
    )
    .set(
      `.${menuClasses.menuItemIcons}`,
      {
        display: 'flex',
      },
      'items',
    )
    .to(
      `.${menuClasses.menuItem}`,
      {
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      },
      'items',
    )
}

export const closeAnimation = (callback?: () => void) => {
  const closeTl = gsap.timeline()
  closeTl
    .addLabel('start')
    .to(
      `.${menuClasses.menuItem}`,
      {
        stagger: 0.2,
        duration: 1,
        opacity: 0,
        ease: 'power2.in',
      },
      'start',
    )
    .set(`.${menuClasses.menuItem}`, {
      display: 'none',
    })
    .to(`.${menuClasses.modal}`, {
      width: '0vw',
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => callback?.(),
    })
}
