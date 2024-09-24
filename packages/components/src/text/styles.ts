'use client'

import type { CSSObject } from '@lukasbriza/styles'
import { styled } from '@lukasbriza/styles'
import type { WebTheme } from '@lukasbriza/theme'
import { Typography } from '@mui/material'
import { handleBreakpoints } from '@mui/system'
import deepmerge from 'deepmerge'
import capitalize from 'lodash.capitalize'

import type { OwnerState, ResponsiveProp } from '../types'
import { isNil, notNil } from '../utils'

import type { TextResponsiveProps } from './types'

const getResponsiveStyle = <Value, Props extends { theme: WebTheme }>(
  getStyle: (value: Value) => CSSObject,
  value: ResponsiveProp<Value>,
  props: Props,
): CSSObject => {
  if (typeof value === 'object' && notNil(value)) {
    const style = handleBreakpoints(props, value, (value: Value, breakpoint) =>
      breakpoint === 'xs' ? {} : getStyle(value),
    ) as CSSObject
    if ('xs' in value && value.xs) {
      return { ...style, ...getStyle(value.xs) }
    }
    return style
  }
  return isNil(value) ? {} : getStyle(value)
}

export const Root = styled(Typography)<OwnerState<TextResponsiveProps>>((props) => {
  const {
    ownerState: { fontSize, fontWeight, lineHeight },
    theme: { typography },
  } = props

  return deepmerge.all<CSSObject>([
    getResponsiveStyle((fontSize) => ({ fontSize: typography[fontSize].fontSize }), fontSize, props),
    getResponsiveStyle(
      (fontWeight) => {
        const prop = `fontWeight${capitalize(fontWeight) as Capitalize<typeof fontWeight>}` as const
        return { fontWeight: typography[prop] }
      },
      fontWeight,
      props,
    ),
    getResponsiveStyle((lineHeight) => ({ lineHeight: typography[lineHeight].lineHeight }), lineHeight, props),
  ])
})
