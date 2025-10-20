import { useState } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router'
import Home from './pages/home'
import Signin from './pages/signin'
import Header from './pages/header'
import RouteProtection from './pages/routeProtection'

import AuthProvider from './context/AuthProvider'
function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signin" element={<Signin />}/>

          <Route element={<RouteProtection />} >
          <Route path="/head" element={<Header />}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
