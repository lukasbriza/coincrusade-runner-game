'use client'

import { webTheme } from '@lukasbriza/theme'
import { forwardRef } from 'react'

import type { KeyboardKeyProps } from './types'

export const RightKey = forwardRef<SVGSVGElement, KeyboardKeyProps>(
  (
    {
      isActive,
      activeColor = webTheme.palette.state.error.primary,
      activeColorSecondary = webTheme.palette.state.error.secondary,
      ...restProps
    },
    ref,
  ) => (
    <svg
      ref={ref}
      {...restProps}
      data-testid="rightkey"
      viewBox="243.7095 296.7315 47.396 39.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M194.565,145.324h-20.8c-3.7,0-6.801,1.199-9.4,3.898c-2.6,2.602-3.898,5.701-3.898,9.301v11.6
		c0,3.701,1.3,6.801,3.898,9.4c2.602,2.6,5.7,3.9,9.4,3.9h20.8c3.7,0,6.899-1.301,9.399-3.9c2.601-2.6,3.899-5.699,3.899-9.4v-11.6
		c0-3.6-1.3-6.699-3.899-9.301C201.464,146.523,198.265,145.324,194.565,145.324z"
        fill={isActive ? activeColorSecondary : '#CCCCCC'}
        transform="matrix(1, 0, 0, 1, 83.24247360229491, 153.10847854614258)"
      />
      <path
        d="M192.964,143.623h-16.799c-2.9,0-5.5,1.101-7.602,3.201c-2.1,2.1-3.1,4.6-3.1,7.5v9.299
		c0,3,1,5.601,3.1,7.601c2.102,2.101,4.7,3.101,7.602,3.101h16.799c2.899,0,5.399-1,7.5-3.101c2.101-2,3.101-4.601,3.101-7.601
		v-9.299c0-2.9-1-5.4-3.101-7.5C198.365,144.722,195.865,143.623,192.964,143.623z"
        fill={isActive ? activeColor : webTheme.palette.common.white}
        transform="matrix(1, 0, 0, 1, 83.24247360229491, 153.10847854614258)"
      />
      <polygon
        fill={webTheme.palette.bodyText.secondary}
        points="176.365,154.824 176.365,162.222 186.065,162.222 186.065,167.023 194.565,158.523 
		186.065,150.023 186.065,154.824 	"
        transform="matrix(1, 0, 0, 1, 83.24247360229491, 153.10847854614258)"
      />
    </svg>
  ),
)
