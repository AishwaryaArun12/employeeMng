import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Table from '../components/Table';
import axios from '../axiosConfig';

const Home = () => {
    const navigate = useNavigate();
    const [value ,setValue] = useState()
    const [names,setNames ] = useState([]);

  const [employees,setEmployees] = useState([]);

  const getEmployees = async ()=>{
      try {
         const res = await axios.get(`/employee/all/${localStorage.getItem('id')}`)
         setEmployees(res.data.data);
         setNames(res.data.data);
      } catch (error) {
          console.log(error,'error');
      }
  }
    useEffect(()=>{
        if(!localStorage.getItem('loginUser')){
            navigate('/login');
        }else{
            getEmployees();
        }
    },[])
    const handleChange = (e)=>{
        setValue(e.target.value);
       if(e.target.value == ''){
        setEmployees(names);
       }else{
        const filterFunction = (user) => user.name.toLowerCase().startsWith(e.target.value.toLowerCase());
        const filteredUserData = names?.filter(filterFunction);
        setEmployees(filteredUserData)
       }
      }
  return (
    <div className='bg-gradient-to-br from-gray-900 via-gray-500 to-gray-900 h-screen'>
     <Nav/>
     <div>
     <input  value={value} onChange={handleChange}  placeholder='Search here....'
      className='h-10  placeholder:text-gray-700 bg-gray-200 rounded-full  text-black w-1/4 m-5 p-2 shadow-md border-gray-500 border-2 ' />
     </div>
     <div>
        {employees.length >0 ? <>
        <Table emps={employees} setemps={setEmployees}/>
        </>:
       <div className='w-full text-center font-semibold text-lg'>
         <p className='text-center'> No Employees Saved Yet.</p>
         </div>}
     </div>
    </div>
  )
}

export default Home
