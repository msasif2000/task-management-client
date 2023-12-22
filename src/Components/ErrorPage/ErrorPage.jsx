import { Link } from "react-router-dom";
import img from '../../assets/images/error.jpg'

const ErrorPage = () => {
    return (
        <div className=" flex flex-col justify-center mx-auto">
            <div className="my-2 flex flex-col justify-center mx-auto ">
                <Link to='/'><button className="btn btn-secondary">Back to Home</button></Link>
            </div>
            <div className="flex flex-col justify-center mx-auto">
                <img src={img} alt="" className="min-h-screen" />
            </div>

        </div>
    );
};

export default ErrorPage;