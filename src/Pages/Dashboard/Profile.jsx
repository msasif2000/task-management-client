
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAuth from "../../Hook/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";


const Profile = () => {
    const [mySelf, setMySelf] = useState({});
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    axiosPublic.get(`/user/${user?.email}`)
    .then(res => {
        setMySelf(res.data);
    })

    return (
        <div>
            <div className="p-8 flex items-center justify-center">
                <img src={mySelf?.photoURL} alt="" className="h-40 w-40 shadow-2xl rounded-xl shadow-fifth"/>
            </div>
            <div>
                <h4 className="text-center text-xl font-bold">{mySelf?.email}</h4>
                <h2 className="text-center text-3xl font-bold">{mySelf?.name}</h2>
            </div>
            <div className="p-8 flex items-center justify-center gap-8">
                <Link to={`updateProfile/${mySelf?.email}`}><button className="btn btn-sm bg-fifth text-first  hover:bg-third">Update Profile</button></Link>
                <Link to='/statistics'><button className="btn btn-sm bg-fifth text-first  hover:bg-third">Statistics</button></Link>
            </div>
        </div>
    );
};

export default Profile;