import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useTodoStore } from './todos'

const TestUseTodoStore = () => {
  const {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodoStore()

  const create = (title: string, memo?: string) => {
    createTodo({title, memo, completed: false})
  }

  const update = (idx:number, args:any) => {
    updateTodo({...todos[idx], ...args})
  }

  const delete_ = (idx:number) => {
    deleteTodo(todos[idx].id)
  }

  return (
    <div>
      <div>Current Todos:{todos.map(t => t.title).join(',')}</div>
      <button onClick={() => create('todo 1')}
      >Create Todo 1</button>
      <button onClick={() => create('todo 2')}
      >Create Todo 2</button>
      <button onClick={() => update(0, {title:'todo 1 updated'})}
      >Update Todo 1</button>
      <button onClick={() => update(1, {title:'todo 2 updated'})}
      >Update Todo 2</button>
      <button onClick={() => delete_(0)}
      >Delete Todo 1</button>
      <button onClick={() => delete_(0)}
      >Delete Todo 2</button>
    </div>
  )
}

test('useTodoStore', () => {
  render(<TestUseTodoStore />)
  const current = screen.getByText(/Current Todos:/)
  const createTodo1 = screen.getByText(/Create Todo 1/)
  const createTodo2 = screen.getByText(/Create Todo 2/)
  const updateTodo1 = screen.getByText(/Update Todo 1/)
  const updateTodo2 = screen.getByText(/Update Todo 2/)
  const deleteTodo1 = screen.getByText(/Delete Todo 1/)
  const deleteTodo2 = screen.getByText(/Delete Todo 2/)

  // initial state
  expect(current).toHaveTextContent('Current Todos:')

  // create 1
  userEvent.click(createTodo1)
  expect(current).toHaveTextContent('Current Todos:todo 1')

  // create 2
  userEvent.click(createTodo2)
  expect(current).toHaveTextContent('Current Todos:todo 1,todo 2')

  // update 1
  userEvent.click(updateTodo1)
  expect(current).toHaveTextContent('Current Todos:todo 1 updated,todo 2')

  // update 2
  userEvent.click(updateTodo2)
  expect(current).toHaveTextContent('Current Todos:todo 1 updated,todo 2 updated')

  // delete 1
  userEvent.click(deleteTodo1)
  expect(current).toHaveTextContent('Current Todos:todo 2 updated')

  // delete 2
  userEvent.click(deleteTodo2)
  expect(current).toHaveTextContent('Current Todos:')
})