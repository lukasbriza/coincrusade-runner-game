import type { Meta, StoryObj } from '@storybook/react'

import { ScaleIcon } from '../../src/index'

const meta = {
  component: ScaleIcon,
  title: 'Scale icon',
} satisfies Meta<typeof ScaleIcon>

type Story = StoryObj<typeof ScaleIcon>

export const Primary: Story = {
  args: {},
}

export default meta
