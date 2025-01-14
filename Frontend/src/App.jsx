import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import Signup from './pages/signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { Children, useState } from 'react'
import RefreshHandler from './RefreshHandler'

function App() {
  const [isAuthentication, setIsAuthentication] = useState(false)

  const PrivateRoute = ({ element }) => {
    return isAuthentication ? element : <Navigate to="/login" />
  }
  return (
    <>
    <RefreshHandler setIsAuthentication={setIsAuthentication} />
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<PrivateRoute element={<Home />}/>} />
    </Routes>
  </>
  )
}

export default App
