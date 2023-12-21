import { Link } from 'react-router-dom';
import bg from '../../../src/assets/images/bg-1.jpg'

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${bg})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl text-first font-bold">Hello there</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <Link to='dashboard'><button className="btn bg-third hover:bg-fifth text-xl text-first font-bold">Let`s Explore</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;