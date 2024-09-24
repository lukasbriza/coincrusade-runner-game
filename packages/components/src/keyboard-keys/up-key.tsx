'use client'

import { webTheme } from '@lukasbriza/theme'
import { forwardRef } from 'react'

import type { KeyboardKeyProps } from './types'

export const UpKey = forwardRef<SVGSVGElement, KeyboardKeyProps>(
  (
    {
      isActive,
      activeColor = webTheme.palette.state.error.primary,
      activeColorSecondary = webTheme.palette.state.error.secondary,
      ...restProps
    },
    ref,
  ) => (
    <svg ref={ref} {...restProps} viewBox="240.8426 284.1559 47.299 39.799" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M138.265,99.923h-20.8c-3.7,0-6.9,1.3-9.4,3.8c-2.7,2.7-3.9,5.8-3.9,9.5v11.5c0,3.701,1.2,6.8,3.9,9.399
		c2.5,2.601,5.7,3.9,9.4,3.9h20.8c3.699,0,6.8-1.301,9.3-3.9c2.7-2.6,3.899-5.699,3.899-9.399v-11.5c0-3.7-1.199-6.8-3.899-9.5
		C145.065,101.223,141.964,99.923,138.265,99.923z"
        fill={isActive ? activeColorSecondary : '#CCCCCC'}
        transform="matrix(1, 0, 0, 1, 136.67759704589844, 185.9329071044922)"
      />
      <path
        d="M136.565,98.223h-16.8c-2.9,0-5.5,1.1-7.5,3.2c-2.1,2-3.1,4.6-3.1,7.5v9.3c0,3,1,5.6,3.1,7.6
		c2,2.101,4.6,3.1,7.5,3.1h16.8c2.899,0,5.5-1,7.5-3.1c2.2-2,3.2-4.6,3.2-7.6v-9.3c0-2.9-1-5.5-3.2-7.5
		C142.065,99.323,139.464,98.223,136.565,98.223z"
        fill={isActive ? activeColor : webTheme.palette.common.white}
        transform="matrix(1, 0, 0, 1, 136.67759704589844, 185.9329071044922)"
      />
      <polygon
        fill={webTheme.palette.bodyText.secondary}
        points="123.765,121.623 131.265,121.623 131.265,111.923 136.065,111.923 127.465,103.423 
		119.065,111.923 123.765,111.923 	"
        transform="matrix(1, 0, 0, 1, 136.67759704589844, 185.9329071044922)"
      />
    </svg>
  ),
)
