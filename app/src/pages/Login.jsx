import React ,{useEffect, useState} from 'react'
import logo2 from '../assets/logo2.jpg'
import bg from '../assets/bg.webp';
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../axiosConfig'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [emailError, setEmailError] = useState('');
    const {register,handleSubmit} = useForm();
    const navigate = useNavigate();
    const submit = async(data)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(data.email.trim()) || data.email.trim() == ""){
            setEmailError('Email not valid')
          }else{
            try {
               const res = await axios.post('/login',data);
               if(res.status == 200){
                 localStorage.setItem('token',res.data.token);
                 localStorage.setItem('id',res.data.user._id)
                 localStorage.setItem('user',JSON.stringify(res.data.user));
                 if(res.data.admin){
                    localStorage.setItem('loginAdmin', true);
                    navigate('/admin');
                 }else{
                    localStorage.setItem('loginUser', true);
                    navigate('/');
                 }
                 
               } 
            } catch (error) {
                if(error.response.status == 401){
                    toast('Sorry, Invalid Credential')
                }
            }
          }
    }
    useEffect(()=>{
        if(localStorage.getItem('loginUser')){
            navigate('/');
        }
    },[]);
  

  return (
    <div className=' bg-cover bg-center h-screen' style={{ backgroundImage: `url(${bg})` }}>
        <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex">
          <img
            className="mx-auto h-20 w-auto rounded-full"
            src={logo2}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...register('email')}
                  className=" bg-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className='text-red-800'>{emailError}</p>
            </div>
            <ToastContainer position="top-center" />
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">
                  Password
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...register('password')}
                  className="bg-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-lg text-gray-400">
            New User?{' '}
            <a href="/signup" className="font-semibold leading-6 text-gray-300 hover:text-indigo-700">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
