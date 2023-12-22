import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { BiUserCircle } from "react-icons/bi";

const Navbar = () => {
    const { user, userLogout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        userLogout();
        navigate('/');
    }
    // console.log(user);
    const navLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        <li><NavLink to='/to-do-list'>My Lists</NavLink></li>
        <li><NavLink to='/statistics'>Statistics</NavLink></li>
        {
            user ?
                ''
                :

                <li><NavLink to='/login'>Login</NavLink></li>
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
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow lg:bg-fifth bg-first rounded-box w-52  text-xl font-bold ">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl text-first">TASK MANAGEMENT</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl font-bold ">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <>
                                <button onClick={handleLogout} className="btn btn-sm bg-third hover:bg-fifth hover:text-first md:mr-2 mr-1 text-sm md:text-xl">Sign Out</button>
                                <Link to='/dashboard'><img src={user.photoURL} alt="" className="h-14 w-14 rounded-full bg-fourth p-1" /></Link>
                            </>
                            :
                            <>
                                <Link to='/register'><button className="btn btn-sm hover:bg-fifth md:mr-2 mr-1  bg-third text-first  text-sm md:text-xl">Sign Up</button></Link>
                                <Link to='/login'><BiUserCircle className="text-third text-4xl" /></Link>
                            </>

                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;