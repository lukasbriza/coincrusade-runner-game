import type { Meta, StoryObj } from '@storybook/react'

import { NumberInput } from '../../src/index'

const meta = {
  component: NumberInput,
  title: 'Number input',
} satisfies Meta<typeof NumberInput>

type Story = StoryObj<typeof NumberInput>

export const Primary: Story = {
  args: {
    error: false,
    name: 'name',
    required: false,
    disabled: false,
    label: 'label',
    helper: 'helper',
    value: 1,
  },
}

export default meta
