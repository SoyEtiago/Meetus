import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import Login from './pages/login/index.tsx'
import Signup from './pages/signup/index.tsx'
import Anonymous from './routes/Anonimous.jsx'
import Protected from './routes/Protected.jsx'
import Dashboard from './pages/dashboard/index.tsx'
import { EventPage } from './pages/events/index.jsx'
import { NewEventPage } from './pages/events/new/index.jsx'
import {ChatViewWithSidebar} from './pages/chat/index.jsx'

function App() {
  return (
    <AuthProvider>
        <div className="App w-screen">
          <Routes>
            <Route element={<Anonymous/>}>
              <Route
                path='/*'
                element={<Login/>}
              />
              <Route
                path='/login'
                element={<Login/>}
              />
              <Route
                path='/register'
                element={<Signup/>}
              />
            </Route>
            <Route element={<Protected/>}>
              <Route path='/dashboard' element={<Dashboard/>}>
                <Route path='/dashboard/events' element={<EventPage/>}/>
                <Route path='/dashboard/events/new' element={<NewEventPage/>}/>
                <Route path='/dashboard/chat' element={<ChatViewWithSidebar/>}/>
              </Route>
            </Route>
          </Routes>
        </div>
    </AuthProvider>
  )
}

export default App
