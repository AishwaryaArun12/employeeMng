import React ,{useState,useEffect} from 'react'
import logo2 from '../assets/logo2.jpg'
import {useForm} from 'react-hook-form';
import bg from '../assets/bg.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../axiosConfig'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [emailError, setEmailError] = useState('');
    const {register,handleSubmit} = useForm();
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('loginUser')){
            navigate('/');
        }
    },[]);
    const submit = async(data)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-Z]{2,}(?:[' -][a-zA-Z]+)*$/;
        if(!emailRegex.test(data.email.trim()) || data.email.trim() == ""){
            setEmailError('Email not valid')
          }else if(!nameRegex.test(data.name.trim()) || data.name.trim() == ""){
            setEmailError('');
            toast('Name should be alphabets and minimum length of 2 ')
           }else if(data.password.trim() == ""){
            toast('Password should be not be empty')
           }else{
            try {
               const res = await axios.post('/register',data);
               if(res.status == 200){
                 
                    navigate('/login');
               } 
            } catch (error) {
                if(error.response.status == 409){
                    toast('Sorry, User already exist')
                }
            }
          }
    }
  

  return (
    <div className=' bg-cover bg-center h-screen' style={{ backgroundImage: `url(${bg})` }}>
        <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex">
          <img
            className="mx-auto h-20 w-auto rounded-full"
            src={logo2}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
            Register Your Account
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submit)}>
          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-300">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  {...register('name')}
                  className=" bg-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
            </div>
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
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-lg text-gray-200">
            Already registered?{' '}
            <a href="/login" className="font-semibold leading-6 text-gray-500 hover:text-indigo-700">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
