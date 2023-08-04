import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UseTitle from "../Hooks/UseTitle";

const Tasks = () => {
    UseTitle('Tasks');
    const {data: tasks = [], refetch} = useQuery(['tasks'], async () => {
        const res = await fetch('https://task-management-server-phi.vercel.app/tasks')
        return res.json();
    })

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();

    let currentDate = `${year}/${month}/${date}`;
    
    const handleStatusUpdate = task => {
        fetch(`https://task-management-server-phi.vercel.app/tasks/${task._id}`, {
            method:'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${task.name} is Completed!`,
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch();
            }
        })
    }
    
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://task-management-server-phi.vercel.app/tasks/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Task has been deleted.',
                            'success'
                        )
                    }
                    refetch();
                })
            }
        })
    }
    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-3xl my-20">Task Management Information Table</h2>
            <div className="overflow-x-auto hidden md:hidden lg:block">
                <table className="table border-separate border-spacing-2 border border-slate-400">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='border border-slate-600 text-xl font-bold text-center'>Serial No</th>
                            <th className='border border-slate-600 text-xl font-bold text-center'>Task Name</th>
                            <th className=' border border-slate-600 text-xl font-bold text-center'>Task Description</th>
                            <th className='border border-slate-600 text-xl font-bold text-center'>Deadline</th>
                            <th className='border border-slate-600 text-xl font-bold text-center'>Status</th>
                            <th className='border border-slate-600 text-xl font-bold text-center'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task,index) => (
                                <tr key={task._id}>
                                    <td className='text-xl text-center'>{index+1}</td>
                                    <td className='text-xl text-center'>{task.name}</td>
                                    <td className='text-xl w-[40%] text-justify'>{task.description}</td>
                                    <td className='text-xl text-center'>{task.date}</td>
                                    <td className='text-center'>
                                        <button onClick={() => handleStatusUpdate(task)} className="btn btn-link text-black text-xl" disabled={task.status=='Completed' || currentDate<task.date}>{currentDate<task.date ? 'Incomplete':`${task.status}`}</button>
                                    </td>
                                    <td className='text-center'>
                                        <button onClick={() => handleDelete(task._id)} className="btn btn-warning">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
            </table>
            </div>
            <div className="overflow-x-auto block md:block lg:hidden mt-20">
                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {
                            tasks.map(task => <div key={task._id}>
                                <div className="card w-80 bg-neutral text-white shadow-xl">
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title w-40 h-24">{task.name}</h2>
                                        <p className="text-justify h-40 overflow-auto">{task.description}</p>
                                        <p className="text-center mt-4">Deadline: {task.date}</p>
                                        <div className="card-actions justify-end">
                                            <button onClick={() => handleStatusUpdate(task)} className="btn btn-link text-white text-xl" disabled={task.status=='Completed' || currentDate<task.date}>{currentDate<task.date ? 'Incomplete':`${task.status}`}</button>
                                        </div>
                                        <div className="card-actions justify-end">
                                            <button onClick={() => handleDelete(task._id)} className="btn btn-warning">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <div className='mt-10 ml-14 md:ml-14 lg:ml-0'>
                <Link to="/add"><button className="btn btn-neutral">Add a New Task</button></Link>
            </div>
        </div>
    );
};

export default Tasks;