import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders App component', () => {
    const { getByText } = render(<App />)
    expect(getByText(/Simple Todo App/i)).toBeInTheDocument()
  })
})