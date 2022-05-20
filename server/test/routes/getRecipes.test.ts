import { build } from '../helper'

beforeEach(() => {
  console.log('seed db')
})
afterEach(() => {
  console.log('empty db')
})

describe('if all the recipes are shown on /recipes', () => {
  const app = build()

  it('fetches all recipes', async () => {})
})
