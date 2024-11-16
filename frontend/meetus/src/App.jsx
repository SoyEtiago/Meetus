import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login/index.tsx'
import Signup from './pages/signup/index.tsx'

function App() {
  return (
    <div className="App w-screen">
      <Routes>
        <Route
          path='/'
          element={<Home/>}
        />
        <Route
          path='/signup'
          element={<Signup/>}
        />
        <Route
          path='/login'
          element={<Login/>}
        />
      </Routes>
    </div>
  )
}

export default App
