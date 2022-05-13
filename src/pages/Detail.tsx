import { Paths } from "Pages"
import { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { TodoContext } from "store/todos"

export const Detail = () => {
  
  const { id } = useParams()
  const { todos } = useContext(TodoContext)
  const todo = todos.find( t => t.id === Number(id) )

  if(!todo) return <></>
  return (
    <div>
      <div className="page-title">Todo Detail</div>
      <div className="detail card">
        <div>
          {todo.title}
        </div>
        <div>
          {todo.memo || '(...not much to say)'}
        </div>
        <div className="back-to-dashboard">
          <Link to={Paths.dashboard}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}