import '@testing-library/jest-dom'
import { Paths } from 'Pages'
import { renderWithProviderAndRoutes } from '__utils__/testRender'
import { Login } from './Login'
import userEvent from '@testing-library/user-event'
import { AuthInfo, Users } from 'store/auth'

function loginSuite(user: AuthInfo) {
  window.alert = jest.fn() // jsdom deosn't have it, so mock it.
  const {history, getByLabelText, getByText} = renderWithProviderAndRoutes(<Login />, { path: Paths.login})
  userEvent.type(getByLabelText(/Username/i), user.name)
  userEvent.type(getByLabelText(/Password/i), user.pass)
  userEvent.click(getByText(/submit/i))
  return history
}

describe('Login Form', () => {
  let user: AuthInfo
  it('should accept login with correct info', () => {
    user = Users[0]
    const history = loginSuite(user)
    expect(history.location.pathname).toBe(Paths.dashboard)
  })
  test('should not accept login with *wrong* info', () => {
    user = {...Users[0], pass: 'wrong-pass'}
    const history = loginSuite(user)
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toBe(Paths.login)
  })
})
