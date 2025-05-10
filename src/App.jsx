import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom'
import Home from './components/pages/Home'
import Complaints from './components/pages/Complaints'
import Login from './components/pages/Login'
import SingleComplaint from './components/pages/SingleComplaint'
import Register from './components/pages/Register'
import RaiseComplaint from './components/pages/RaiseComplaint'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllUsers from './components/pages/AllUsers'
import AllComplaints from './components/pages/AllComplaints'
const App = () => {
  return (
    <Router>
          <Navbar/>
        
      <Routes>
 
  <Route path ="/" element={<Home/>}/>
  <Route path ="/login" element={<Login/>}/>
  <Route path ="/register" element={<Register/>}/>
  <Route path ="/raise-complaint" element={<RaiseComplaint/>}/>
  <Route path ="/complaints" element={<Complaints/>}/>
  <Route path ="/complaints/:id" element={<SingleComplaint/>}/>
  <Route path ="/admin/users" element={<AllUsers/>}/>
  <Route path ="/admin/complaints" element={<AllComplaints/>}/>
  
     </Routes>
     <ToastContainer/>
    </Router>
  )
}

export default App
