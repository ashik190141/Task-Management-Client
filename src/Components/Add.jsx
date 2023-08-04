
import { useNavigate } from 'react-router-dom';
import UseTitle from '../Hooks/UseTitle';
import Swal from 'sweetalert2';
import { useState } from 'react';

const Add = () => {
    UseTitle('Add Task');
    const navigate = useNavigate();
    const [cnt, setCount] = useState(100);
    const [disable, setDisable] = useState(true);

    const handleInput = (e) => {
        let n = e.target.value;
        let requiredLength = 100 - n.length;
        if (requiredLength <= 0) {
            setDisable(false);
        } else {
            setDisable(true);
        }
        setCount(requiredLength);
    }

    const handleAdd = event => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const description = form.description.value;
        const status = form.status.value;
        const date = form.date.value;
        
        if (!isNaN(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please, Enter Valid Task Name'
            })
            return
        }

        if (!isNaN(description)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please, Enter Valid Task Description'
            })
            return
        }

        const taskInfo = {
            name,
            description,
            status,
            date
        };

        console.log(taskInfo);

        fetch('https://task-management-server-phi.vercel.app/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(taskInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: `Task Added Successfully`,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    }).then(result => {
                        if (result.isConfirmed) {
                            navigate('/');
                        }
                    })
                }
            })
    }

    return (
        <div className='max-w-7xl mx-auto mt-20'>
            <h1 className='text-center font-bold text-3xl mb-20'>Add Task <span className="text-orange-500">Information</span></h1>
            <form onSubmit={handleAdd} className="p-5">
                <div className="form-control w-full mb-3">
                    <label>
                        <input type="text" name="name" placeholder="Task Name" required
                    className="input border-olive-lightgreen w-full bg-slate-100"/>
                    </label>
                </div>

                <div className="form-control w-full mb-1">
                    <label>
                        <textarea type="text" onChange={handleInput} required name="description" placeholder="Task Description"
                    className="input border-olive-lightgreen text-justify my-1 w-full h-40 bg-slate-100" /><br />
                    </label>
                </div>
                <div className={`form-control w-full mb-3 ${cnt<=0 ? 'hidden':'block'}`}>
                    <p className='text-red-500 font-bold flex justify-end'>* Must have {cnt} characters</p>
                </div>

                <div className="form-control w-full mb-3">
                    <label>
                        {/* <input type="radio" name="category" placeholder="Teddy" className="input input-bordered w-full" /> */}
                        {/* <select className="input border-olive-lightgreen w-full bg-slate-100" name="status">
                            <option value='Pending'>Pending</option>
                            <option value='Completed'>Completed</option>
                        </select> */}
                        <input type="text" name="status" placeholder="Task Status" required readOnly
                    className="input border-olive-lightgreen w-full bg-slate-100" defaultValue="Pending"/>
                    </label>
                </div>

                <div className="form-control w-full mb-3">
                    <label>
                        <input type="date" name="date" placeholder="Deadline" required
                    className="input border-olive-lightgreen w-full bg-slate-100"/>
                        {/* <DatePicker></DatePicker> */}
                    </label>
                </div>

                <div className="form-control w-full mb-3 flex flex-col items-center justify-center">
                    <input type="submit" value="Add Task" disabled={disable}
                    className="mt-10 btn bg-lightorange border-none  text-white btn-primary w-1/3"/>
                </div>
            </form>
        </div>
    );
};

export default Add;