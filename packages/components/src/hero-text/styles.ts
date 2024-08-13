'use client'

import { styled } from '@lukasbriza/styles'

import { heroTextClasses } from './classes'

export const Root = styled('div')(({ theme: { size } }) => ({
  width: '100%',

  [`& .${heroTextClasses.main}`]: {
    textAlign: 'center',
    fontSize: size.size15,
  },

  [`& .${heroTextClasses.subtitle}`]: {
    textAlign: 'center',
    fontSize: size.size10,
  },
}))
