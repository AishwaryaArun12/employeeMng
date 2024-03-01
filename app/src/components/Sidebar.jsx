import React from 'react'
import { HiUserAdd, HiLogout, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className=' border flex flex-col border-l-0 h-[550px] border-y-0 text-gray-300 text-md font-semibold items-center'>
      <a href='/' className='block mt-8 text-center h-20 lg:inline-block  mr-4 '>
                    <MdDashboard className='inline-block mr-1' />Dashboard
                </a>
                <a href='/add' className='block mt-4 h-20 lg:inline-block lg:mt-0 mr-4'>
                    <HiUserAdd className='inline-block mr-1' />Add Employee
                </a>
                <a href='/profile' className='block h-20 mt-4 lg:inline-block lg:mt-0 mr-4'>
                    <HiUserCircle className='inline-block mr-1' />Profile
                </a>
    </div>
  )
}

export default Sidebar
