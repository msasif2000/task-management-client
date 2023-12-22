
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAuth from "../../Hook/useAuth";


const Profile = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    axiosPublic.get(`/user/${user?.email}`)
    return (
        <div>
            
        </div>
    );
};

export default Profile;