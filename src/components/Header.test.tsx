import '@testing-library/jest-dom'
import { Paths } from 'Pages'
import { renderWithProviderAndRoutes } from '__utils__/testRender'
import { Header } from './Header'
import { Users } from 'store/auth'

describe('Header', () => {
  it('shows "Log In" without auth', () => {
    const {getByText, getByRole} = renderWithProviderAndRoutes(<Header />, { path: Paths.login })
    expect(getByText(/Welcome! Please log in/i)).toBeInTheDocument()
    expect(getByRole('button', {name: 'Log In'})).toBeInTheDocument()
  })

  // Note this is async, since it's not visible in the first render.
  it('shows "Log Out" with auth', async () => {
    const user = Users[0]
    const {findByText, findByRole} = renderWithProviderAndRoutes(<Header />, { path: Paths.login, user })
    expect(await findByText(`Welcome ${user.name}!`)).toBeInTheDocument()
    expect(await findByRole('button', {name: 'Log Out'})).toBeInTheDocument()
  })
})