//import ListToDo from "../Dashboard/ListToDo";

import { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import OngoingTask from "../Dashboard/OngoingTask";
import PreviousTask from "../Dashboard/PreviousTask";



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
        <div>
            <div className="pt-12">
                <h2 className="text-center text-3xl font-bold ">My To-Do-List</h2>
                <p className="text-center text-xl text-third ">You can drop and drag here to arrange your task</p>
                <div className="p-4 max-w-7xl mx-auto overflow-x-auto">
                    <table className="table min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>TITLE</th>
                                <th>DEADLINE</th>
                                <th>PRIORITY </th>
                                <th>DESCRIPTION</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <OngoingTask></OngoingTask>
            </div>
            <div>
                <PreviousTask></PreviousTask>
            </div>
        </div>
    );
};

export default MyList;