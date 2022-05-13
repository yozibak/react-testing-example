import '@testing-library/jest-dom'
import { Paths } from 'Pages'
import { renderWithProviderAndRoutes } from '__utils__/testRender'
import userEvent from '@testing-library/user-event'
import { Users } from 'store/auth'
import { Detail } from './Detail'
import { MyInitialTodos } from 'store/todos'

describe('View todo detail', () => {

  const user = Users.find(u => u.name === 'Katsumi')
  const myTodo = MyInitialTodos[0]

  it('should show todo detail with :id path', async () => {
    const myTodoPath = `${Paths.detail}/${myTodo.id}`
    const {
      findByText
    } = renderWithProviderAndRoutes(<Detail />, { path: `${Paths.detail}/:id`, user, paramsPath: myTodoPath })

    expect(await findByText(myTodo.title)).toBeInTheDocument()
    myTodo.memo && expect(await findByText(myTodo.memo)).toBeInTheDocument()
  })

  it('should send users to dashbaord when the goback text is pushed', async () => {
    const myTodoPath = `${Paths.detail}/${myTodo.id}`
    const {
      findByText, history
    } = renderWithProviderAndRoutes(<Detail />, { path: `${Paths.detail}/:id`, user, paramsPath: myTodoPath })

    const goback = await findByText(/Back to Dashboard/i)
    userEvent.click(goback)
    
    expect(history.location.pathname).toBe(Paths.dashboard)
  })
})