import { useState } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router'
import Home from './pages/home'
import Signin from './pages/signin'
import Header from './pages/header'
import Dashboard from "./layout/dashboardLayout"
import SidebarList from './components/sidebarlist'
import Playground from './playground'

import RouteProtection from './pages/routeProtection'
import AuthProvider from './context/AuthProvider'
import ResourceProvider from './context/ResourceProvider'


function App() {
return (
<AuthProvider>
  <ResourceProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signin" element={<Signin />}/>

        {/* DASHBOARD TESTING */}
        <Route path="/test" element={<Dashboard />}/>
        <Route path="/test2" element={<SidebarList />}/>

        <Route element={<RouteProtection />} >
        <Route path="/head" element={<Header />}/>
        </Route>

        {/* FEATURE TESTING */}
        <Route path="/play" element={<Playground />}/>

      </Routes>
    </BrowserRouter>
  </ResourceProvider>
</AuthProvider>
)
}

export default App
