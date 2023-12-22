import { CgProfile } from "react-icons/cg";
import { FcOvertime } from "react-icons/fc";
import { MdTimerOff } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";



const DashBoard = () => {

    const { user, userLogout } = useAuth();
    const currentEmail = user?.email;
    const navigate = useNavigate();
    const handleLogout = () => {
        userLogout()
        navigate('/');
    }
    return (
        <div className="bg-second">
            <div className="md:flex md:container mx-auto">
                <div className="md:w-2/6 md:flex-shrink-0">
                    <div className="navbar-start md:hidden">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="red"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="sty menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-third rounded-box w-52 ">
                                <li>
                                    <h2 className="text-2xl text-fifth font-bold bg-first "><FcHome className="text-2xl" />DASHBOARD</h2>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/createTask'><FaBusinessTime className="text-2xl" />Create Task</NavLink>
                                </li>
                                <li>
                                    <NavLink to={`/dashboard/toDoList/${currentEmail}`}><FcOvertime className="text-2xl" />To-Do-Lists</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/ongoingTask'><GiSandsOfTime className="text-2xl" />Ongoing Task</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/prevTask'><MdTimerOff className="text-2xl" />Previous Task</NavLink>
                                </li>

                                <div className="divider"></div>


                                <li>
                                    <NavLink to='/'><FaHome className="text-2xl"></FaHome>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/profile'><CgProfile className="text-2xl" />Profile</NavLink>
                                </li>

                                <li>
                                    <button onClick={handleLogout} className="flex items-center btn btn-sm">
                                        <BiLogOut className="text-2xl" /><span>Sign Out</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="md:flex hidden w-68 min-h-screen bg-third text-first pt-12">

                        <ul className="menu text-xl">
                            <li>
                                <h2 className="text-2xl text-fifth font-bold bg-first"><FcHome className="text-2xl" />DASHBOARD</h2>
                            </li>
                            <li>
                                <NavLink to='/dashboard/createTask'><FaBusinessTime className="text-2xl" />Create Task</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/dashboard/toDoList/${currentEmail}`}><FcOvertime className="text-2xl" />To-Do-Lists</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/ongoingTask'><GiSandsOfTime className="text-2xl" />Ongoing Task</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/prevTask'><MdTimerOff className="text-2xl" />Previous Task</NavLink>
                            </li>


                            <div className="divider"></div>


                            <li>
                                <NavLink to='/'><FaHome className="text-2xl"></FaHome>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/profile'><CgProfile className="text-2xl" />Profile</NavLink>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="flex items-center">
                                    <BiLogOut className="text-2xl" /><span>Sign Out</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                
                </div>
                
                <div className="md:flex-1 overflow-x-auto">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;