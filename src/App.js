import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/UI/navbar/Navbar'
import About from './pages/About'
import PostIdPage from './pages/PostIdPage'
import Posts from './pages/Posts'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        {/* динамический маршрут */}
        <Route path="/posts/:id" element={<PostIdPage />} />
        <Route path="" element={<Navigate to="/posts" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App