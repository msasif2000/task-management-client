import { Link } from 'react-router-dom';
import bg from '../../../src/assets/images/bg-1.jpg'

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${bg})` }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl  text-first font-bold">Hello there</h1>
                        <p className="mb-5 font-bold text-first ">
                            Introducing our innovative task management website designed to streamline your daily workflow. With user-friendly features and a sleek interface, our platform empowers you to organize tasks efficiently, collaborate seamlessly with team members, and stay on top of deadlines. From customizable to-do lists to progress tracking, we offer a comprehensive solution to enhance productivity.</p>
                        <Link to='dashboard'><button className="btn bg-third hover:bg-fifth text-xl text-first font-bold">Let`s Explore</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;