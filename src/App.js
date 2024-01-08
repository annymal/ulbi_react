import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/UI/navbar/Navbar'
import { AuthContext } from './components/context'
import AppRouter from './pages/AppRouter'

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App