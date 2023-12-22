import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import useAxiosPublic from "../../Hook/useAxiosPublic";


const Login = () => {
    const { googleLogin, userLogin, userLogout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();
    // const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        axiosPublic.get(`/usersLogin?email=${email}`)
            .then(res => {
                if (res.data) {
                    userLogin(email, password)
                        .then(result => {
                            if (result) {
                                Swal.fire({
                                    title: 'User Login Successful.',
                                    showClass: {
                                        popup: 'animate__animated animate__fadeInDown'
                                    },
                                    hideClass: {
                                        popup: 'animate__animated animate__fadeOutUp'
                                    }
                                });
                                navigate(location.state?.from ? location.state.from : '/dashboard');
                            }
                        })
                        .catch(error => {
                            console.log(error.message)
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'check email and password again!',
                                footer: '<a href="/login">Sign in again?</a>'
                            });

                        })
                }
            })
            .catch(error => {
                console.log(error.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'check email again!',
                    footer: '<a href="/login">Sign in again?</a>'
                });

            })

    }

    const handleGoogleLogin = () => {
            googleLogin()
                .then((result) => {
                    const { displayName, email, photoURL } = result.user;
                   
                    axiosPublic.get(`/usersLogin?email=${email}`)
                        .then(res => {
                            if (res.data) {
                                const userInfo = { name: displayName, email, photoURL};
                                axiosPublic.post('/users', userInfo).then((res) => {
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            title: 'Login  Successful!',
                                            text: 'You are Logged in',
                                            icon: 'success',
                                            confirmButtonText: 'Ok',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                navigate(
                                                    location.state?.from ? location.state.from : '/dashboard'
                                                );
                                            }
                                        });
                                    }
                                });

                                navigate(location.state?.from ? location.state.from : '/dashboard');
                            } else {
                                const userInfo = { name: displayName, email, photoURL};
                                axiosPublic.post('/users', userInfo)
                                    .then((res) => {
                                        console.log(
                                            res.data
                                        );
                                        if (res.data.insertedId) {
                                            Swal.fire({
                                                title: 'Account Created!',
                                                text: 'You are Logged in',
                                                icon: 'success',
                                                confirmButtonText: 'Ok',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    navigate(
                                                        location.state?.from ? location.state.from : '/dashboard'
                                                    );
                                                }
                                            });
                                        }
                                        else {
                                            userLogout();
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Error!',
                                                text: 'User with the provided email is not found!',
                                                confirmButtonText: 'Ok',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    navigate('/');
                                                }
                                            });
                                        }
                                    })
                            }
                        })
                        .catch(() => {
                            // Handle database error
                            const userInfo = { name: displayName, email, photoURL };
                            axiosPublic.post('/users', userInfo)
                                .then((res) => {
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            title: 'Account Created!',
                                            text: 'You are Logged in',
                                            icon: 'success',
                                            confirmButtonText: 'Ok',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                navigate(
                                                    location.state?.from ? location.state.from : '/dashboard'
                                                );
                                            }
                                        });
                                    }
                                });

                            navigate(location.state?.from ? location.state.from : '/dashboard');
                        });
                })
                .catch((error) => {
                    // Handle Google login error
                    console.log(error.message);
                    Swal.fire({
                        title: 'Error!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Ok',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate(location.state?.from ? location.state.from : '/login');
                        }
                    });
                });
         
    };

    return (
        <div>
            <div className="">
                <div className="hero min-h-screen  lg:w-4/5 md:w-5/6 mx-auto">
                    <div className="hero-content flex-col mx-auto w-full">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold">Login now!</h1>
                        </div>
                        <div className="card flex-shrink-2 w-full max-w-sm shadow-2xl shadow-fifth border-red-600">
                            <form onSubmit={handleLogin} className="card-body">
                            
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                </div>
                               
                                <div className="form-control mt-6">
                                    <input className="btn btn-sm text-white py-2 rounded-xl font-bold bg-second "  type="submit" value="Sign in" />
                                </div>

                            </form>
                            <div className="flex justify-center">
                                <label className="label">
                                    <p>Don`t have an Account? <Link to="/register" className="underline text-fourth font-bold">Sign Up</Link></p>
                                </label>
                            </div>
                            <div className="text-center">
                                <p>--or--</p>
                                <p>continue with</p>

                            </div>
                            <div onClick={handleGoogleLogin} className="flex justify-center mx-auto mb-2 border-2 rounded-lg border-fifth my-1">
                                <p className="flex gap-2 p-2 font-bold bg-second"><FcGoogle className="text-2xl "/> Google</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;