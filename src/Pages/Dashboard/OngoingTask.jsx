import { useState } from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";

const OngoingTask = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [ongoingTask, setOngoingTask] = useState([]);
    axiosPublic.get(`/ongoingTasks/${user?.email}`)
        .then((res) => {
            setOngoingTask(res.data);
        })
    //console.log(ongoingTask);

    const handleStatus = (id) => {
        Swal.fire({
            title: "Start Your Task!",
            text: "Once you started, you will see it in Ongoing Task.",
            imageUrl: "https://unsplash.it/400/200",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosPublic.get(`/myOngoingTask/${id}`)
                        .then((result) => {
                            console.log(result);
                            axiosPublic.post('/prevTask', result.data)
                                .then((result) => {
                                    if (result.data.insertedId) {
                                        axiosPublic.delete(`/deleteOngoingTask/${id}`)
                                            .then(res => {
                                                if (res.data.deletedCount) {
                                                    Swal.fire(
                                                        'Started!',
                                                        'See Your Ongoing Task',
                                                        'success'
                                                    )
                                                    window.location.reload();
                                                }
                                            })
                                    }
                                })
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
                            <th>DEADLINE </th>
                            <th>PRIORITY </th>
                            <th>DESCRIPTION</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ongoingTask.map((item, index) => (
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
                                <td>{item.priority}</td>
                                <td>{item.details}</td>
                                <td>
                                    <button onClick={() => handleStatus(item._id)} className="btn btn-sm bg-fourth text-first px-1">DONE</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OngoingTask;