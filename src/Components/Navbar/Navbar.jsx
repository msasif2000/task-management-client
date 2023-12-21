import { Link } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { BiUserCircle } from "react-icons/bi";
import './Navbar.css'
const Navbar = () => {
    const { user, userLogout } = useAuth();
    const handleLogout = () => {
        userLogout();
    }
    // console.log(user);
    const navLinks = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        {
            user ?
                ''
                :

                <li><Link to='/login'>Login</Link></li>
        }

    </>
    return (
        <div>
            <div className="navbar bg-second">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="sty menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl text-first">TASK MANAGEMENT</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="sty menu menu-horizontal px-1 ">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <>
                                <button onClick={handleLogout} className="btn btn-sm md:mr-2 mr-1 border-2 border-red-600 text-sm md:text-xl">Sign Out</button>
                                <Link to='/dashboard'><img src={user.photoURL} alt="" className="h-14 w-14 rounded-full bg-red-600 p-1" /></Link>
                            </>
                            :
                            <>
                                <Link to='/register'><button className="btn btn-sm md:mr-2 mr-1  bg-third text-first  text-sm md:text-xl">Sign Up</button></Link>
                                <Link to='/login'><BiUserCircle className="text-third text-4xl" /></Link>
                            </>

                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;