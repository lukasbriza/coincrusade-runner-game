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

export default meta
