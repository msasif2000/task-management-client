import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";


const EditTask = () => {
    const axiosPublic = useAxiosPublic();

    const data = useLoaderData().data;

    const handleUpdateTask = (e) => {   
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const deadline = form.deadline.value;
        const priority = form.priority.value;
        const details = form.details.value;

        const updateTask = { title, deadline, priority, details };

        axiosPublic.put(`/updateTask/${data._id}`, updateTask)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: 'Task Updated Successfully.',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                    window.location.reload();
                }
            })
    }
    //console.log(data);
    return (
        <div>
            <div className="md-container mx-auto">
                <div className="lg:p-12 md:p-6 p-4 space-y-6">
                    <h2 className="font-rancho text-4xl text-center">Update My Task</h2>
                    <form onSubmit={handleUpdateTask} className="font-raleway ">
                        <div className="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Task Name</span>
                                </label>
                                <label className="">
                                    <input required type="text" name="title" defaultValue={data.title} className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Deadline</span>
                                </label>
                                <label className="">
                                    <input required type="datetime-local" name="deadline" defaultValue={data.deadline} className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Priority</span>
                                </label>
                                <label className="">
                                    <input required type="number" name="priority" defaultValue={data.priority} className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Description</span>
                                </label>
                                <label className="">
                                    <input required type="text" name="details" defaultValue={data.details} className="input input-bordered w-full " />
                                </label>
                            </div>
                        </div>
                        <input type="submit" value="Confirm Update" className="w-full mt-6 bg-fifth text-first  border-2 border-third text-center p-2 text-2xl" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditTask;