import { render, screen } from '@testing-library/react'
import Home from '.'
import renderWithStore from '../../../helpers/testHelper'

describe('Dashboard', () => {
  const setup = (): ReturnType<typeof render> => renderWithStore(<Home />)

  it('welcomes the user', async () => {
    setup()
  })

  it('shows the page title', async () => {
    setup()
    const text = screen.getByText('Discover recipes')
    expect(text).toBeInTheDocument
  })

  it('displays the dashboard hero banner', async () => {
    setup()
  })

  it('displays the latest (3) recipes', async () => {
    setup()
  })
})
