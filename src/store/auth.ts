import { createContext, useState } from "react"

export type User = {
  name: string
}

export type AuthInfo = {
  name: string
  pass: string
}

interface AuthStore {
  user?: User,
  login: (i: AuthInfo) => void
  logout: () => void
}

export const AuthContext = createContext({} as AuthStore)

export const useAuthStore = () => {

  const [user, setUser] = useState<User>()

  const login = ({name, pass}: AuthInfo) => {
    const user = Users.find( u => u.name === name && u.pass === pass) 
    if (user) {
      setUser({name})
    } else {
      alert("Incorrect username or password.")
    }
  }

  const logout = () => {
    setUser(undefined)
  }

  return {
    user,
    login,
    logout,
  }
}

export const Users = [
  {
    name: 'Katsumi',
    pass: 'MyCoolPass',
  },
  {
    name: 'John',
    pass: 'TheNotoriousDoe',
  },
  {
    name: 'Michael',
    pass: 'YouBrokeMyHeartFredo',
  },
]