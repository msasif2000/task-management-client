//import ListToDo from "../Dashboard/ListToDo";

import { useState } from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import OngoingTask from "../Dashboard/OngoingTask";
import PreviousTask from "../Dashboard/PreviousTask";



const MyList = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [taskList, setTaskList] = useState([]);
    axiosPublic.get(`/prevTasks/${user?.email}`)
        .then((res) => {
            setTaskList(res.data);
        })
    return (
        <div>
            <div>
                <div className="pt-12">
                    <h2 className="text-center text-3xl font-bold ">My To-Do-List</h2>
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
                                {taskList.map((item, index) => (
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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