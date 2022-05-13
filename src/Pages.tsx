import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Container } from 'components/Container'
import { Dashboard } from 'pages/Dashboard'
import { Detail } from 'pages/Detail'
import { Home } from 'pages/Home'
import { Login } from 'pages/Login'

export const Paths = {
  index: '/',
  login: '/login',
  dashboard: '/dashboard',
  detail: '/detail'
} 

export const Pages = () => {

  return (
    <Routes>
      <Route path={Paths.index} element={<Container />}>
        <Route index element={<Home />} />
        <Route path={Paths.login} element={<Login/>} />
        <Route path={Paths.dashboard} element={<Dashboard />} />
        <Route path={`${Paths.detail}/:id`} element={<Detail />} />
        <Route path='*' element={<Home />} />
      </Route>
    </Routes>
  )
}