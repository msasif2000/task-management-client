
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";


const ListToDo = () => {
    //const [listToDo, setListToDo] = useState([]);
    const data = useLoaderData().data;
    //console.log(data);
const axiosPublic = useAxiosPublic();
    const handleDeleteTask = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You could not revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        .then((result) => {
            if(result.isConfirmed){
                axiosPublic.delete(`/deleteTask/${id}`)
                .then(res => {
                    if(res.data.deletedCount){
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        window.location.reload();
                    }
                })  
            }
        })
    } 
    return (
        <div className="pt-12">
            <h2 className="text-center text-3xl font-bold ">Your To-Do-List</h2>
            <div className="p-4 max-w-7xl mx-auto overflow-x-auto">
                <table className="table min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>TITLE</th>
                            <th>DATE </th>
                            <th>DESCRIPTION</th>
                            <th>EDIT</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <span className="">{item.title}</span>
                                </td>
                                <td>
                                    {item.deadline.split('T')[0]} 
                                    <br />
                                    {item.deadline.split('T')[1].split('.')[0]}
                                </td>
                                <td>{item.details}</td>
                                <td>
                                    <Link to={`/dashboard/edit/${item._id}`}><button className="btn btn-sm bg-sky-600 text-white">EDIT</button></Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteTask(item._id, item.campId)} className="btn btn-sm bg-red-600 px-1">DELETE</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListToDo;