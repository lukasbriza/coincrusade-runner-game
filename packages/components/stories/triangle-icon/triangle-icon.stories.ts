import type { Meta, StoryObj } from '@storybook/react'

import { TriangleIcon } from '../../src/index'

const meta = {
  component: TriangleIcon,
  title: 'Triangle icon',
} satisfies Meta<typeof TriangleIcon>

type Story = StoryObj<typeof TriangleIcon>

export const Primary: Story = {
  args: {},
}

export default meta
