
'use client';
import DataTable,{createTheme} from 'react-data-table-component';
import { HiPencil } from 'react-icons/hi';

export default function Component({emps,setemps}) {
    createTheme('solarized', {
        text: {
            primary: '#D1D5DB',
            secondary: '#D1D5DC',
        },
        background: {
            default: '#000A19',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        button: {
            default: '#2aa198',
            hover: 'rgba(0,0,0,.08)',
            focus: 'rgba(255,255,255,.12)',
            disabled: 'rgba(255, 255, 255, .34)',
        },
        sortFocus: {
            default: '#2aa198',
        },
    });
    const columns = [
        {
            name: 'Employee Id',
            selector: row => row.empid,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Salary',
            selector: row => row.salary,
            sortable: true,
        },
        {
            name: 'Job Position',
            selector: row => row.job,
            sortable: true,
        },
        {
            name: 'Edit',
            cell: row => (
                <a href={`/editEmp/${row._id}`} className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                    <HiPencil />
                </a>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];
    const data = emps;
    

  return (
    <div className="m-3 bg-transparent">
      <DataTable
            columns={columns}
            data={data}
            pagination={true}
            paginationRowsPerPageOptions={[6,10]}
            paginationPerPage={6}
            theme={'solarized'}
            
            className='bg-transparent'
        />
    </div>
  );
}
