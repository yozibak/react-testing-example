import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { useAuthStore, Users } from 'store/auth'
import { render, screen } from '@testing-library/react'

const TestUseAuthStore = () => {
  const { user, login, logout } = useAuthStore()
  const loginByName = (name: string) => () => {
    const usr = Users.find( u => u.name === name )
    usr && login(usr)
  }
  return (
    <div>
      <div>Current User:{user?.name}</div>
      <button onClick={loginByName('Katsumi')}>Log In as Katsumi</button>
      <button onClick={loginByName('John')}>Log In as John</button>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}

test('useAuthStore', () => {
  render(<TestUseAuthStore />)
  const current = screen.getByText(/current/i)
  const loginKatsumi = screen.getByText(/katsumi/i)
  const loginJohn = screen.getByText(/john/i)
  const logout = screen.getByText(/log out/i)

  // initial state
  expect(current).toHaveTextContent('Current User:')

  // login as katsumi
  userEvent.click(loginKatsumi)
  expect(current).toHaveTextContent('Current User:Katsumi')

  // logout
  userEvent.click(logout)
  expect(current).toHaveTextContent('Current User:')

  // login as john
  userEvent.click(loginJohn)
  expect(current).toHaveTextContent('Current User:John')
})