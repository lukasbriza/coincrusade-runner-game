import type { Meta, StoryObj } from '@storybook/react'

import { Aperture } from '../../src/index'

const meta = {
  component: Aperture,
  title: 'Aperture',
} satisfies Meta<typeof Aperture>

type Story = StoryObj<typeof Aperture>

export const Primary: Story = {
  args: {
    stage: 1,
  },
}

export default meta
