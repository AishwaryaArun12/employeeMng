import { useState } from 'react'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import AddEmployee from './pages/AddEmployee'
import Profile from './pages/Profile'
import EditEmp from './components/EditEmp'
import Edit from './components/Edit';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/add' element={<AddEmployee/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/editEmp/:id' element={<EditEmp/>}/>
        <Route exact path='/editProfile' element={<Edit/>}/>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
