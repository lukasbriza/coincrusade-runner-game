import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { LoadingBar } from './loading-bar'

afterEach(() => {
  cleanup()
})

describe('LoadingBar', () => {
  test('Should render', () => {
    const result = render(<LoadingBar maxProgressValue={100} progress={0} />)

    expect(result.getByTestId('loadingbar')).toBeDefined()
  })
})
