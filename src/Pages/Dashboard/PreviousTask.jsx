import { useState } from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const PreviousTask = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [prevTask, setPrevTask] = useState([]);
    axiosPublic.get(`/prevTasks/${user?.email}`)
        .then((res) => {
            setPrevTask(res.data);
        })
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
                            <th>DESCRIPTION</th>
                            <th>STATUS</th>
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
                                <td>{item.details}</td>
                                <td>
                                    <button className="btn btn-sm hover:bg-fifth bg-fourth text-first px-1">Completed</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PreviousTask;