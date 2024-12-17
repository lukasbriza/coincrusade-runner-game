import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { Sprite } from './sprite'

afterEach(() => {
  cleanup()
})

describe('Sprite', () => {
  test('Should render', () => {
    const result = render(<Sprite columns={0} duration={0} height={0} image="" rows={0} width={0} />)

    expect(result.getByTestId('sprite')).toBeDefined()
  })
})
