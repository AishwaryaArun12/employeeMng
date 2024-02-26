import React from 'react'
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../axiosConfig'
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

const AddEmployee = () => {
    const {register,handleSubmit} = useForm();
    const navigate = useNavigate();
    const submit = async(data)=>{
        const nameRegex = /^[a-zA-Z]{2,}(?:[' -][a-zA-Z]+)*$/;
        if(!nameRegex.test(data.name.trim()) || data.name.trim() == ""){
            toast('Name should be alphabets and minimum length of 2 ')
        }else if(!nameRegex.test(data.job.trim()) || data.job.trim() == ""){
            toast('Job Position should be alphabets and minimum length of 2')
        }else if(parseFloat(data.salary)<0){
            toast('Salary should be greater than 0');
        }else{
            try {
                const add = await axios.post(`/employee/add/${localStorage.getItem('id')}`,data);
                navigate('/')  
            } catch (error) {
                if(error.response.status == 409){
                    toast('Employee already exist');
                }
            }
        }

    }
  return (
    <div className='bg-gradient-to-br from-gray-900 via-gray-500 to-gray-900 h-screen'>
        <Nav/>
        <div className='"flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8"'>
      <div>
      <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add New Employee
          </h2>
      </div>
      <div>
      <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="p-3 bg-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
            </div>
            <ToastContainer position="top-center" />
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-900">
                  Salary
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="salary"
                  name="salary"
                  type="number"
                  autoComplete="salary"
                  required
                  min={0}
                  {...register('salary')}
                  className="p-3 bg-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="job" className="block text-sm font-medium leading-6 text-gray-900">
                  Job Position
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="job"
                  name="job"
                  type="text"
                  autoComplete="job"
                  required
                  {...register('job')}
                  className="p-3 bg-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
            
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-br from-gray-900 via-gray-500 to-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Employee
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
    </div>
  )
}

export default AddEmployee