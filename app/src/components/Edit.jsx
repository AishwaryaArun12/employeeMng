
'use client';
import Nav from './Nav';
import bg from '../assets/bg.webp'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../axiosConfig'

export default function Component() {
  const [user,set] = useState({});
  const {register,handleSubmit,setValue} = useForm();
  const getUser = async ()=>{
    try {
       const res = await axios.get(`/getUser/${localStorage.getItem('id')}`)
       console.log(res)
       set(res.data.user);
       setValue('name', res.data.user.name);
       setValue('designation', res.data.user.designation);
       setValue('mobile', res.data.user.mobile);
       setValue('address', res.data.user.address);
    } catch (error) {
        console.log(error,'error');
    }
}
  useEffect(()=>{
      if(!localStorage.getItem('loginUser')){
          navigate('/login');
      }else{
          getUser();
      }
  },[])

    const navigate = useNavigate();
    const submit = async(data)=>{
        console.log(data)
        const nameRegex = /^[a-zA-Z]{2,}(?:[' -][a-zA-Z]+)*$/;
        if(!nameRegex.test(data.name.trim()) || data.name.trim() == ""){
            toast('Name should be alphabets and minimum length of 2 ')
        }else if(!nameRegex.test(data.designation.trim()) || data.designation.trim() == ""){
            toast('Job Position should be alphabets and minimum length of 2')
        }else{
            try {
                const edit = await axios.put(`/editProfile/${user._id}`,data);
                 console.log(edit)
                onCloseModal();  
            } catch (error) {
                if(error.response?.status == 409){
                    toast('Something went wrong');
                }
            }
        }

    }


  function onCloseModal() {
    navigate('/profile');
   
  }

  return (
    <div className=' bg-cover bg-center h-screen' style={{ backgroundImage: `url(${bg})` }}>
      
    <Nav/>
          <div className="space-y-6 mt-10">
            <h3 className="text-xl font-medium text-gray-300 text-center dark:text-white">Edit Profile</h3>
            <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 m-3 items-center" onSubmit={handleSubmit(submit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-400">
                Name
              </label>
              <div className="mt-2">
                <input
                defaultValue={user.name}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  {...register('name')}
                  className="p-3 bg-blue-200 block w-full rounded-md border-0 py-1.5 text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
            </div>
            <ToastContainer position="top-center" />
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-400">
                  Designation
                </label>
                
              </div>
              <div className="mt-2">
                <input
                defaultValue={user.designation}
                  id="designation"
                  name="designation"
                  type="text"
                  autoComplete="designation"
                  
                  
                  {...register('designation')}
                  className="p-3 bg-blue-200 block w-full rounded-md border-0 py-1.5 text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-400">
                  Mobile
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  defaultValue={user.mobile}
                  autoComplete="mobile"
                  required
                  {...register('mobile')}
                  className="p-3 bg-blue-200 block w-full rounded-md border-0 py-1.5 text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
              <div className="flex items-center justify-between">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-400">
                  Address
                </label>
                
              </div>
              <div className="mt-2">
                <input
                defaultValue={user.address}
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  
                  
                  {...register('address')}
                  className="p-3 bg-blue-200 block w-full rounded-md border-0 py-1.5 text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            
            </div>  
            
            </div>

            <div className='flex justify-between'>
              <button
              onClick={onCloseModal}
                type="submit"
                className="flex w-3/4 m-2 justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex w-3/4 m-2 justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit
              </button>
            </div>
          </form>

        </div>
          </div>
       
    </div>
  );
}

