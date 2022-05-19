import { build } from '../helper'

describe('example tests', () => {
  const app = build()

  test('example is loaded', async () => {
    const res = await app.inject({
      url: '/',
    })

    expect(res.payload).toBe('{"hello":"from root.js"}')
  })
})
