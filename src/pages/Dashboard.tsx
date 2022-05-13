import { Paths } from "Pages"
import { ChangeEvent, FormEvent, useState } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { Todo, TodoContext } from "store/todos"

export const Dashboard = () => {

  const { todos, updateTodo, deleteTodo } = useContext(TodoContext)

  const toggleTodoStatus = (todo: Todo) => {
    updateTodo({ ...todo, completed: !todo.completed })
  }

  return (
    <div className="dashboard">
      <div className="page-title">Dashboard</div>
        <div className="todo-cards">
        {
          todos.map( t => (
            <div key={`todo-${t.id}`} className={`todo card ${t.completed ? 'completed' : ''}`}>
              <div>
                <input type="checkbox" checked={t.completed} onChange={() => toggleTodoStatus(t)}/>
                <div className="todo__title">
                  <Link to={`${Paths.detail}/${t.id}`}>
                    {t.title}
                  </Link>
                </div>
              </div>
              <button className="discard" onClick={() => deleteTodo(t.id)}>
                🗑
              </button>
            </div>
          ))
        }
        <AddTodo />
      </div>
    </div>
  )
}

const AddTodo = () => {

  const [open, setOpen] = useState(false)

  const { createTodo } = useContext(TodoContext)

  const [formState, setFormState] = useState({title: '', memo: ''})

  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFormState({...formState, [e.target.name]: e.target.value})
  }

  const onSubmit = (e:FormEvent) => {
    e.preventDefault()
    createTodo({...formState, completed: false})
    setFormState({title: '', memo: ''})
    setOpen(false)
  }

  return !open ? (
    <button className="add-todo" onClick={() => setOpen(true)}>+</button>
  ) : (
    <div className="card">
      <form onSubmit={onSubmit}>
        <label htmlFor="todo-title">Describe your todo </label>
        <input id="todo-title" type="text" name="title" placeholder="Buy milk" onChange={onChange}/>
        <label htmlFor="todo-memo">Any notes </label>
        <input id="todo-memo" type="text" name="memo" placeholder="I can't be without it" onChange={onChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}