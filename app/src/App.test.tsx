import { render, screen } from '@testing-library/react'
import App from './App'
import renderWithStore from './helpers/TestHelper'

const setup = (): ReturnType<typeof render> =>
  renderWithStore(
    <App
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
