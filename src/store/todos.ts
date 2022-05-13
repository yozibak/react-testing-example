import { createContext, useEffect, useState } from "react"
import { User } from "./auth"

export type Todo = {
  id: number
  title: string
  completed: boolean
  memo?: string
}

type CreateTodo = Omit<Todo, 'id'>

interface TodoStore {
  todos: Todo[]
  createTodo: (todo: CreateTodo) => void
  updateTodo: (todo: Todo) => void
  deleteTodo: (id: number) => void
}

export const TodoContext = createContext({} as TodoStore)

export const useTodoStore = (user?: User) => {

  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    if (user && user.name === 'Katsumi') {
      setTodos(MyInitialTodos) // retrieve from pseudo db
    } else {
      setTodos([])
    }
  }, [user, setTodos])

  const createTodo = (todo: CreateTodo) => {
    const id = todos.length + 1
    setTodos([...todos, {...todo, id}])
  }

  const updateTodo = (todo: Todo) => {
    const idx = todos.findIndex( t => t.id === todo.id )
    idx > -1 && setTodos([...todos.slice(0, idx), todo, ...todos.slice(idx+1)])
  }

  const deleteTodo = (id: number) => {
    const idx = todos.findIndex( t => t.id === id )
    idx > -1 && setTodos([...todos.slice(0, idx), ...todos.slice(idx+1)])
  }

  return {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
  }
}

export const MyInitialTodos:Todo[] = [
  {
    id: 1,
    title: 'Fix header padding',
    completed: false,
    memo: 'Page header is still ugly, gotta fix'
  },
  {
    id: 2,
    title: 'Watch Seven Samurai',
    completed: true,
  },
  {
    id: 3,
    title: 'Write e2e tests with Selenium!!',
    completed: false,
  },
]