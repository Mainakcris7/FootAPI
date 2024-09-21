import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Documentation from './pages/Documentation'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Error from './pages/Error'
import './App.css'

function App() {

  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/docs" element={<Documentation />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
