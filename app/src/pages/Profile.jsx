import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios,{URL} from '../axiosConfig'
import { HiPencil } from 'react-icons/hi';
import bg from '../assets/bg.webp'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [user,setUser] = useState({})
   const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`/getUser/${localStorage.getItem('id')}`).then((res)=>{
            setUser(res.data.user)
        })
        if(!localStorage.getItem('loginUser')){
            navigate('/login');
        }
    },[])
  return (
    <div className=' bg-cover bg-center h-screen' style={{ backgroundImage: `url(${bg})` }}>
     <Nav/>
    

  <div className="max-w-lg mx-auto my-10 bg-transparent border border-gray-600 rounded-lg shadow-2xl p-5">
  <a href='/editProfile' className="font-medium text-gray-300 hover:underline border-gray-500 m-2 items-center flex">
                <HiPencil/>
              Edit
            </a>
    <img className="w-32 h-32 rounded-full mx-auto" src={user.image?.startsWith('http')? user.image : `${URL}/${user.image}`} alt="Profile picture" />
    <h2 className="text-center text-gray-100 text-2xl font-semibold mt-3">{user.name}</h2>
    <p className="text-center text-gray-200 mt-1">{user.designation}</p>
    <div className="flex justify-center mt-5">
      <p class="text-gray-300 hover:text-blue-700 mx-3">{user.email}</p>
      <p class="text-gray-300 hover:text-blue-700 mx-3">{user.mobile}</p>
      
    </div>
    {user.address && <div class="mt-5">
      <h3 class="text-xl text-gray-600 font-semibold">Address</h3>
      <p class="text-gray-400 mt-2">{user.address}</p>
    </div>}
  </div>

     
    </div>
  )
}

export default Profile
