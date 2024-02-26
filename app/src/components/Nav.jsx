import React, { useState } from 'react';
import logo2 from '../assets/logo2.jpg';
import { HiUserAdd, HiLogout, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('loginUser');
        navigate('/login');
    }

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <nav className='shadow-2xl flex items-center justify-between text-gray-300 text-md font-semibold bg-transparent border-b w-full p-4'>
            <div className="flex items-center flex-shrink-0 mr-6">
                <img src={logo2} className='h-12 bg-transparent w-auto rounded-full' alt="" />
                <a href='/' className='ml-2 text-lg font-bold tracking-wide'>Employee Management</a>
            </div>
            <div className="block lg:hidden">
                <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-900 hover:border-transparent">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {showMenu ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>
            <div className={`${showMenu ? 'block' : 'hidden'} lg:hidden`}>
                <div className="px-2 pt-2 pb-3">
                    <a href='/' className='block mt-1 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700'>Dashboard</a>
                    <a href='/add' className='block mt-1 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700'>Add Employee</a>
                    <a href='/profile' className='block mt-1 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700'>Profile</a>
                    <button onClick={logout} className="block mt-4 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"><HiLogout className='inline-block mr-1' />Logout</button>
                </div>
            </div>
            <div className="hidden lg:block lg:w-auto">
                <a href='/' className='block mt-4 lg:inline-block lg:mt-0 mr-4'>
                    <MdDashboard className='inline-block mr-1' />Dashboard
                </a>
                <a href='/add' className='block mt-4 lg:inline-block lg:mt-0 mr-4'>
                    <HiUserAdd className='inline-block mr-1' />Add Employee
                </a>
                <a href='/profile' className='block mt-4 lg:inline-block lg:mt-0 mr-4'>
                    <HiUserCircle className='inline-block mr-1' />Profile
                </a>
            </div>
            <div className="hidden lg:block lg:w-auto">
                <button onClick={logout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-900 hover:bg-white mt-4 lg:mt-0">
                    <HiLogout className='inline-block mr-1' />Logout
                </button>
            </div>
        </nav>
    );
}

export default Nav;
