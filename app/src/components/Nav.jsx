import React from 'react'
import logo2 from '../assets/logo2.jpg'
import { HiUserAdd, HiLogout, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const Nav = () => {
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('loginUser');
        navigate('/login');
    }
  return (
    <div className=' shadow-2xl flex items-center text-gray-300 text-md font-semibold justify-around h-16 bg-transparent border-b w-full'>
        <div>
            <img src={logo2} className='h-12 bg-transparent w-auto rounded-full' alt="" />
        </div>
        <a href='/' className='flex items-center justify-around'>
            <MdDashboard/>
            <h2>Employee Management</h2>
        </a>
        <a href='/add' className='flex items-center justify-around'>
            <HiUserAdd/>
            <h2>Add Employee</h2>
        </a>
        <a href='/profile' className='flex items-center justify-around'>
            <HiUserCircle/>
            <h2>Profile</h2>
        </a>
        <div onClick={logout} className='flex items-center justify-around'>
            <HiLogout/>
            <h2>Logout</h2>
        </div>
      
    </div>
  )
}

export default Nav
