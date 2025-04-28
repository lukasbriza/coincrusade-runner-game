import type { Meta, StoryObj } from '@storybook/react'

import { LanguageSwitcher } from '../../src/index'

const meta = {
  component: LanguageSwitcher,
  title: 'LanguageSwitcher',
} satisfies Meta<typeof LanguageSwitcher>

type Story = StoryObj<typeof LanguageSwitcher>

export const Primary: Story = {
  args: {
    options: [
      {
        value: 'cz',
        flag: (
          <img
            alt="cz"
            src="/cz-flag.png"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        ),
      },
      {
        value: 'en',
        flag: (
          <img
            alt="en"
            src="/en-flag.png"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        ),
      },
    ],
    initialValue: 'cz',
  },
}

export default meta
