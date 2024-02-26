
'use client';
import {  Table } from 'flowbite-react';
import { HiPencil } from 'react-icons/hi';

export default function Component({emps,setemps}) {

  return (
    <div className="overflow-x-auto items-center">
      <Table className=' w-11/12 m-5 text-pretty '>
        <Table.Head className='text-lg text-gray-200 p-2 border-b border-black'>
          <Table.HeadCell className='p-3'>Employee Id</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Salary</Table.HeadCell>
          <Table.HeadCell>Job Position</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {emps.map((emp)=>
          <Table.Row className="bg-transparent shadow-lg  text-center border-gray-500 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap p-3 font-medium text-gray-400 ">
            {emp._id}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap p-2 font-medium text-gray-400 dark:text-white">{emp.name}</Table.Cell>
          <Table.Cell className="whitespace-nowrap p-2 font-medium text-gray-400 dark:text-white">{emp.salary}</Table.Cell>
          <Table.Cell className="whitespace-nowrap p-2 font-medium text-gray-400 dark:text-white">{emp.job}</Table.Cell>
          <Table.Cell>
          <a href={`/editEmp/${emp._id}`}  className="font-medium text-gray-300 hover:underline border-gray-500 m-2 items-center flex">
                <HiPencil/>
              Edit
            </a>
          </Table.Cell>
        </Table.Row>)}
         
        </Table.Body>
      </Table>
    </div>
  );
}
