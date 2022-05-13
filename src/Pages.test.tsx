import '@testing-library/jest-dom'
import { Pages, Paths } from './Pages'
import { renderWithProvider } from '__utils__/testRender'

describe('Pages routing tests', () => {
  it('renders home as index page', () => {
    const {getByText} = renderWithProvider(<Pages />, {path: Paths.index})
    expect(getByText(/Simple Todo App/i)).toBeInTheDocument()
  })

  it('renders other page at different path', () => {
    const {getByRole} = renderWithProvider(<Pages />, {path: Paths.login})
    expect(getByRole('button', {name: 'Submit'})).toBeInTheDocument()
  })

  it('redirects to index when visiting dashboard without auth', () => {
    const {history} = renderWithProvider(<Pages />, { path: Paths.dashboard})
    expect(history.location.pathname).toBe(Paths.index)
  })
})