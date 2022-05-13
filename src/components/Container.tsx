import { Paths } from "Pages"
import { useContext, useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "store/auth"
import { Header } from "./Header"

export const Container = () => {
  
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    if(!user && !(location.pathname === '/' || location.pathname === '/login' )) {
      navigate(Paths.index)
    }
  }, [user, location])

  return (
    <div>
      <Header />
      <div className="pagebody">
        <Outlet />
      </div>
    </div>
  )
}