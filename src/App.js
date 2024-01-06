import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/UI/navbar/Navbar'
import AppRouter from './pages/AppRouter'

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (

    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App