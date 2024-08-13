import type { Meta, StoryObj } from '@storybook/react'

import { StringInput } from '../../src/index'

const meta = {
  component: StringInput,
  title: 'String input',
} satisfies Meta<typeof StringInput>

type Story = StoryObj<typeof StringInput>

export const Primary: Story = {
  args: {
    defaultValue: 'default value',
    error: false,
    name: 'name',
    required: false,
    disabled: false,
    label: 'label',
    helper: 'helper',
    value: 'value',
  },
}

export default meta
