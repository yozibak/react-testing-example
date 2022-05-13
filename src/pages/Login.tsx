import { Paths } from "Pages"
import { FormEvent, useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "store/auth"

export const Login = () => {

  const { user, login } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      navigate(Paths.dashboard)
    }
  }, [user])

  const [name, setName] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    login({name, pass})
  }

  return (
    <div className='login'>
      <div className="page-title">Log In</div>
      <div className="card">
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="username-input">Username</label>
          <input id="username-input" type='text' onChange={e => setName(e.target.value)} />
          <label htmlFor="password-input">Password</label>
          <input id="password-input" type='password' onChange={e => setPass(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}