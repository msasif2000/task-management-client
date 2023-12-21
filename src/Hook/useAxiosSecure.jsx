import axios from 'axios';
import { useEffect } from 'react';  // Import useEffect
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';


export const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
   
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { userLogout } = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const status = error.response.status;
                if (status === 401 || status === 403) {
                    await userLogout();
                    navigate('/');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, userLogout]);

    return axiosSecure;
};

export default useAxiosSecure;
