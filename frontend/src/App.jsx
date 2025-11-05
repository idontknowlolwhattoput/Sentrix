import { useState } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router'
import Home from './pages/home'
import Signin from './pages/signin'
import Header from './pages/header'
import Dashboard from "./layout/dashboardLayout"
import SidebarList from './components/sidebarlist'
import Playground from './components/sidebarlist copy'

import RouteProtection from './pages/routeProtection'
import AuthProvider from './context/AuthProvider'
import ResourceProvider from './context/ResourceProvider'

import DashboardHome from './components/Dashboard/dashboard'
import ContextProvider from './context/ContextProvider'
import PatientRegistration from './components/Patient/patientRegistration'
import AddEmployee from './components/Employee/addEmployee'


function App() {
return (
     <ContextProvider>
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home />}/>
           <Route path="/signin" element={<Signin />}/>
           <Route path="/patient-registration" element={<PatientRegistration />}/>
            <Route path="/gh" element={<AddEmployee />}/>
           {/* DASHBOARD TESTING */}
           <Route path="/test" element={<Dashboard />}/>
           <Route path="/test2" element={<SidebarList />}/>
           <Route path="/dashboardhome" element={<DashboardHome />} />

           <Route element={<RouteProtection />} >
           <Route path="/head" element={<Header />}/>
           </Route>

           {/* FEATURE TESTING */}
           <Route path="/play" element={<Playground />}/>

         </Routes>
       </BrowserRouter>
     </ContextProvider>
)}

export default App
