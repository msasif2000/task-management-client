import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from 'sweetalert2';

const CreateTask = () => {
    const axiosSecure = useAxiosSecure;
    const location = useLocation();
    const navigate = useNavigate();

    const handleNewTask = e => {
        e.preventDefault();
        const form = e.target;

        const campName = form.campName.value;
        const venue = form.venue.value;
        const audience = form.audience.value;
        const image = form.image.value;
        const date = form.date.value;
        const campFee = form.campFee.value;
        const participants = parseInt(form.participants.value);
        const details = form.details.value;


        const newTask = { campName, venue, audience, image, date, campFee, participants, details };
        //console.log(newCamp);

        axiosSecure.post('/camp', newTask)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Camp Created Successfully.',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });

                    navigate(location.state?.from ? location.state.from : '/to-do-list');

                }
            })
    }
    return (
        <div>
            <div className="md-container mx-auto">
                <div className="lg:p-12 md:p-6 p-4 space-y-6">
                    <h2 className="font-rancho text-4xl text-center">Create Your Task Here</h2>
                    <form onSubmit={handleNewTask} className="font-raleway ">
                        <div className="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Task Name</span>
                                </label>
                                <label className="">
                                    <input required type="text" name="taskName" placeholder="Enter Task Name" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Deadline</span>
                                </label>
                                <label className="">
                                    <input required type="datetime-local" name="deadline" placeholder="Select Date and Time" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Priority</span>
                                </label>
                                <label className="">
                                    <input required type="number" name="priority" defaultValue={1} className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Write Details</span>
                                </label>
                                <label className="">
                                    <input required type="text" name="details" placeholder="Write Description for Camp" className="input input-bordered w-full " />
                                </label>
                            </div>
                        </div>
                        <input type="submit" value="Confirm Task" className="w-full mt-6 bg-fifth text-first  border-2 border-third text-center p-2 text-2xl" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;