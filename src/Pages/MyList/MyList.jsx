//import ListToDo from "../Dashboard/ListToDo";

import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";

const MyList = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [draggedItem, setDraggedItem] = useState(null);

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        axiosPublic.get(`/myTasks/${user?.email}`).then((res) => {
            setTasks(res.data); // Update the tasks state here
        });
    }, [axiosPublic, user]);

    const [ongoingTask, setOngoingTask] = useState([]);
    axiosPublic.get(`/ongoingTasks/${user?.email}`)
        .then((res) => {
            setOngoingTask(res.data);
        })


    const [prevTask, setPrevTask] = useState([]);
    axiosPublic.get(`/prevTasks/${user?.email}`)
        .then((res) => {
            setPrevTask(res.data);
        })
    const date = new Date();
    //console.log(date.getDate(), date.getMonth(), date.getFullYear());

    tasks.forEach((task) => {
        const taskDeadline = new Date(task.deadline);
        if (
            date.getDate() === taskDeadline.getDate() &&
            date.getMonth() === taskDeadline.getMonth() &&
            date.getFullYear() === taskDeadline.getFullYear()
        ) {
            Swal.fire({
                title: "You have a task to do today!",
                text: "Check your task list",
                imageUrl: "https://unsplash.it/400/200",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
            });
        }
    });

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
    
    return (
        <div className="lg:flex gap-2 pt-12 min-h-screen lg:justify-center lg:mx-auto">
            <div className="">
                <h2 className="text-center text-3xl font-bold py-2">To-Do-List</h2>
                <div className="p-4 max-w-7xl mx-auto overflow-x-auto bg-second text-fifth">
                    <table className="table min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>TITLE</th>
                                <th>DEADLINE</th>
                                <th>PRIORITY </th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h2 className="text-center text-3xl font-bold py-2">Ongoing Task List</h2>
                <div className="p-4 max-w-7xl mx-auto overflow-x-auto  bg-third text-first">
                    <table className="table min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>TITLE</th>
                                <th>DEADLINE </th>
                                <th>PRIORITY </th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h2 className="text-center text-3xl font-bold py-2">Previous Task</h2>
                <div className="p-4 max-w-7xl mx-auto overflow-x-auto bg-fourth text-second">
                    <table className="table min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="text-first">
                                <th>#</th>
                                <th>TITLE</th>
                                <th>DEADLINE </th>
                            </tr>
                        </thead>
                        <tbody>
                            {prevTask.map((item, index) => (
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

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyList;