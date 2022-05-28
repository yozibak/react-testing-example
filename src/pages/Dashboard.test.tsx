import '@testing-library/jest-dom'
import { Dashboard } from './Dashboard'
import userEvent from '@testing-library/user-event'
import { MyInitialTodos } from 'store/todos'
import { render } from '@testing-library/react'

const myTodo = MyInitialTodos[0]

describe('Dashboard todos list', () => {

  it("shows initial todos", async () => {
    const {findByText} = render(<Dashboard />)

    expect(await findByText(myTodo.title)).toBeInTheDocument()
  })
})

describe('Create todo', () => {
  
  it('caretes/shows new todo when users submit new todo', async () => {

    const {
      getByRole, findByLabelText, findByRole, findByText
    } = render(<Dashboard />)

    // Act
    userEvent.click(getByRole('button', { name: '+' }))

    // Assert todo form
    const titleInput = await findByLabelText(/Describe your todo/i)
    const meemoInput = await findByLabelText(/Any notes/i)
    expect(titleInput).toBeInTheDocument()
    expect(meemoInput).toBeInTheDocument()

    // Act
    const todo = { title: 'test add-todo feature', memo: 'see if it works!'}
    const submitBtn = await findByRole('button', {name: /Add/i })
    userEvent.type(titleInput, todo.title)
    userEvent.type(meemoInput, todo.memo)
    userEvent.click(submitBtn)

    // Assert
    expect(await findByRole('button', { name: '+' })).toBeInTheDocument() // form, closed 
    expect(await findByText(todo.title)).toBeInTheDocument() // new todo
  })
})

describe('Complete todo', () => {
  
  it('toggles todo status when checkbox clicked', async () => {
    const {
      getAllByRole,
      container
    } = render(<Dashboard />)

    // before
    const checkbox = getAllByRole('checkbox')[0]
    const todoCard = container.getElementsByClassName('todo')[0]
    expect(checkbox).not.toBeChecked()
    expect(todoCard).toHaveClass('todo card')

    // check
    userEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(todoCard).toHaveClass('todo card completed')

    // revert
    userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
    expect(todoCard).toHaveClass('todo card')
  })
})

describe('Delete todo', () => {
  it('deletes todo by pushing discard button', () => {
    const {
      getAllByRole,
      getByText,
      queryByText,
    } = render(<Dashboard />)

    // before
    const btn = getAllByRole('button', {name: '🗑'})[0]
    expect(getByText(myTodo.title)).toBeInTheDocument()

    // Act
    userEvent.click(btn)

    // Assert
    expect(queryByText(myTodo.title)).not.toBeInTheDocument()
  })
})
