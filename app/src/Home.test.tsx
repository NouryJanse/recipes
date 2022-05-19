import { render, screen } from '@testing-library/react'
import Home from './Home'
import renderWithStore from './helpers/TestHelper'

const setup = (): ReturnType<typeof render> =>
  renderWithStore(
    <Home
      logout={(): string => {
        return ''
      }}
    />,
  )

it('renders the nav bar', () => {
  setup()
  const Navigation = screen.getByTestId('Navigation')
  expect(Navigation).toBeInTheDocument
})
