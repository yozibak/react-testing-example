import { Paths } from "Pages"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "store/auth"

export const Header = () => {

  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div className="header">
      <div>
        <div>
          {
            user
              ? `Welcome ${user.name}!`
              : `Welcome! Please log in.`
          }
        </div>

        <button onClick={ user ? logout : () => navigate(Paths.login, {replace:true})}>
          {
            user
              ? 'Log Out'
              : 'Log In'
          }
        </button>
      </div>
    </div>
  )
}