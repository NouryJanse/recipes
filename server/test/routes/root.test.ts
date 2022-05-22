import { build } from '../setupTestApplication'

describe('if root call on / works', () => {
  const app = build()

  it('shows hello from root.ts', async () => {
    const response = await app.inject({
      url: '/',
    })
    expect(JSON.parse(response.payload)).toEqual({ hello: 'from root.ts' })
  })
})
