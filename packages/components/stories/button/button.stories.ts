import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../../src/index'

const meta = {
  component: Button,
  title: 'Button',
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    text: 'Button',
  },
}

export const Disabled: Story = {
  args: {
    text: 'Button',
    disabled: true,
  },
}
export default meta
