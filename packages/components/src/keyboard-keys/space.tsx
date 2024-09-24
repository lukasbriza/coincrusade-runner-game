'use client'

import { webTheme } from '@lukasbriza/theme'
import { forwardRef } from 'react'

import type { KeyboardKeyProps } from './types'

export const Space = forwardRef<SVGSVGElement, KeyboardKeyProps>(
  (
    {
      isActive,
      activeColor = webTheme.palette.state.error.primary,
      activeColorSecondary = webTheme.palette.state.error.secondary,
      ...restProps
    },
    ref,
  ) => (
    <svg ref={ref} {...restProps} viewBox="192.4653 309.1269 162.399 39.799" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(1, 0, 0, 1, 146.60125732421875, 115.70389556884764)">
        <path
          d="M194.964,195.123h-135.8c-3.7,0-6.8,1.201-9.4,3.9c-2.6,2.6-3.9,5.699-3.9,9.301v11.6
  c0,3.699,1.3,6.8,3.9,9.4c2.6,2.6,5.7,3.898,9.4,3.898h135.8c3.699,0,6.899-1.299,9.399-3.898c2.601-2.602,3.9-5.701,3.9-9.4v-11.6
  c0-3.602-1.302-6.701-3.9-9.301C201.865,196.324,198.666,195.123,194.964,195.123z"
          fill={isActive ? activeColorSecondary : '#CCCCCC'}
        />
        <path
          d="M193.365,193.423h-131.8c-2.9,0-5.5,1.1-7.6,3.199c-2.1,2.1-3.1,4.6-3.1,7.5v9.301c0,3,1,5.6,3.1,7.6
  c2.1,2.1,4.7,3.1,7.6,3.1h131.8c2.9,0,5.4-1,7.5-3.1c2.1-2,3.1-4.6,3.1-7.6v-9.301c0-2.9-1-5.4-3.1-7.5
  C198.765,194.522,196.265,193.423,193.365,193.423z"
          fill={isActive ? activeColor : webTheme.palette.common.white}
        />
      </g>
    </svg>
  ),
)
