
'use client';

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import {useForm} from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../axiosConfig'

export default function Component({user,set}) {
  const [openModal, setOpenModal] = useState(false);
  const {register,handleSubmit} = useForm({
    defaultValues : {
        name : user.name,
        designation : user.designation,
        mobile : user.mobile,
        address : user.address
    }
  });
  console.log(register)
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
                console.log(edit);
                set(edit.data); 
                onCloseModal();  
            } catch (error) {
                if(error.response?.status == 409){
                    toast('Something went wrong');
                }
            }
        }

    }


  function onCloseModal() {
    setOpenModal(false);
   
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="font-medium text-gray-300 hover:underline border-gray-500 m-2 items-center flex">
                <HiPencil/>
              Edit
            </Button>
      <Modal show={openModal} size="sm" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body >
          <div className="space-y-6 ">
            <h3 className="text-xl font-medium text-gray-900 text-center dark:text-white">Edit Profile</h3>
            <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 m-3 items-center" onSubmit={handleSubmit(submit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="p-3 bg-blue-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
            </div>
            <ToastContainer position="top-center" />
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="p-3 bg-blue-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="p-3 bg-blue-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
              <div className="flex items-center justify-between">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
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
                  className="p-3 bg-blue-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        </Modal.Body>
      </Modal>
    </>
  );
}

