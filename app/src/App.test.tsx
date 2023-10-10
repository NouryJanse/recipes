import { render, screen } from '@testing-library/react'
import App from './App'
import renderWithStore from './helpers/testHelper'

const setup = (): ReturnType<typeof render> => renderWithStore(<App />)

it('renders the nav bar', () => {
  setup()
  const Navigation = screen.getByTestId('Navigation')
  expect(Navigation).toBeInTheDocument
})
