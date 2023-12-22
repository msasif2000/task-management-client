import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const ListToDo = () => {
    const data = useLoaderData().data;
    const axiosPublic = useAxiosPublic();

    const [draggedItem, setDraggedItem] = useState(null);
    const [tasks, setTasks] = useState(data);

    const handleDragStart = (e, index) => {
        setDraggedItem(tasks[index]);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", index);
    };

    const handleDragOver = (index) => {
        const draggedOverItem = tasks[index];

        if (draggedItem === draggedOverItem) return;

        // Remove the draggedItem from the original position
        const updatedTasks = tasks.filter((item) => item !== draggedItem);

        // Insert the draggedItem at the new position
        const newIndex = updatedTasks.indexOf(draggedOverItem);
        updatedTasks.splice(newIndex, 0, draggedItem);

        setTasks(updatedTasks);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

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
                if (result.isConfirmed) {
                    axiosPublic.delete(`/deleteTask/${id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
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
    const handleOngoingTask = (id) => {
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
                    axiosPublic.get(`/myTask/${id}`)
                        .then((result) => {
                            console.log(result);
                            axiosPublic.post('/ongoingTask', result.data)
                                .then((result) => {
                                    if (result.data.insertedId) {
                                        axiosPublic.delete(`/deleteTask/${id}`)
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
            <h2 className="text-center text-3xl font-bold ">My To-Do-List</h2>
            <p  className="text-center text-xl text-third ">You can drop and drag here to arrange your task</p>
            <div className="p-4 max-w-7xl mx-auto overflow-x-auto">
                <table className="table min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>TITLE</th>
                            <th>DEADLINE</th>
                            <th>PRIORITY </th>
                            <th>DESCRIPTION</th>
                            <th>EDIT</th>
                            <th>DELETE</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((item, index) => (
                            <tr
                                key={item._id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={() => handleDragOver(index)}
                                onDragEnd={handleDragEnd}
                            >
                                <th>{index + 1}</th>
                                <td>
                                    <span className="">{item.title}</span>
                                </td>
                                <td>
                                    {item.deadline.split("T")[0]}
                                    <br />
                                    {item.deadline.split("T")[1].split(".")[0]}
                                </td>
                                <td>{item.priority}</td>
                                <td>{item.details}</td>
                                <td>
                                    <Link to={`/dashboard/edit/${item._id}`}>
                                        <button className="btn btn-sm hover:bg-third bg-first text-black">
                                            EDIT
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteTask(item._id)}
                                        className="btn btn-sm bg-third hover:bg-fifth  text-first px-1"
                                    >
                                        DELETE
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleOngoingTask(item._id)}
                                        className="btn btn-sm bg-fourth hover:bg-third text-first px-1"
                                    >
                                        START
                                    </button>
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
