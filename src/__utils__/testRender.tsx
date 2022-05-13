import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history';
import { useEffect } from 'react';
import { Route, Router, Routes } from 'react-router-dom'
import { AuthContext, AuthInfo, useAuthStore } from "store/auth";
import { TodoContext, useTodoStore } from "store/todos";

const Test = ({children, history, user}: {
  children: JSX.Element
  history: MemoryHistory
  user?: AuthInfo
}) => {

  const authStore = useAuthStore()
  const todoStore = useTodoStore(authStore.user)

  useEffect(() => {
    if(user && !authStore.user) {
      authStore.login(user)
    }
  }, [user, authStore])

  return (
    <AuthContext.Provider value={authStore}>
      <TodoContext.Provider value={todoStore}>
        <Router location={history.location} navigator={history}>
          {children}
        </Router>
      </TodoContext.Provider>
    </AuthContext.Provider>
  )
}

interface TestRenderInfo {
  path: string, user?: AuthInfo, paramsPath?: string
}

export const renderWithProvider = (
  ui: JSX.Element, 
  { path = '/', user, paramsPath }: TestRenderInfo
) => {
  const history = createMemoryHistory({ initialEntries: [paramsPath || path]})
  return {
    history,
    ...render(
      <Test user={user} history={history}>
        {ui}
      </Test>
    )
  }
}

/**
 * render single component which needs to be in the routes in the context
 */
export const renderWithProviderAndRoutes = (
  ui: JSX.Element, 
  { path, user, paramsPath }: TestRenderInfo
) => {
  return renderWithProvider(
    <Routes>
      <Route path=''>
        <Route path={path} element={ui} />
        <Route path='*' element={<div />}/>
      </Route>
    </Routes>, 
    {path, user, paramsPath}
  )
}