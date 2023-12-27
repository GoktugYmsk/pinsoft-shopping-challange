'use client'
import { useState } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import { GoLock } from "react-icons/go";
import { FaRegUser } from 'react-icons/fa';

import api from '../../intercepter'
import { store } from '@/app/store/store';
import Header from '@/app/components/header';

import '../pages/login/index.scss';


interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    email: string;
    password: string;
    role: Role;
    data: any;
    username: string;
}


const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState()
    const [error, setError] = useState('');

    const router = useRouter();
    const handleLogin = async () => {
        try {
            const authResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'authenticate', {
                username: username,
                password: password,
            });

            const token = authResponse.data.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            sessionStorage.setItem('userTokenTry', token);
            const response = await api.get('/user_account');
            setData(response.data);

            if (response.status === 200) {
                const users: User[] = response.data;
                const matchingUser = users.find(user => user.username === username);

                if (matchingUser) {
                    localStorage.setItem('isLogin', String(true));

                    if (matchingUser.role.name === 'admin') {
                        router.push('/adminPage');
                    } else {
                        router.push('/main');
                    }
                } else {
                    setError('Invalid username or password');
                }
            } else if (response.status === 403) {
                setError('Unauthorized. Insufficient permissions to access user account.');
            } else {
                setError('Server error. Please try again later.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    };



    const handleSigninClick = () => {
        router.push('/signin');
    };


    return (
        <div className='container-login'>
            <Provider store={store}>
                <Header />
            </Provider>
            <div className='container-login__box'>
                <h1>WELCOME</h1>
                <div className='container-login__box__top-input'>
                    <FaRegUser className='container-login__box__user-icon' />
                    <label>
                        <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div className='container-login__box__down-input'>
                    <GoLock className='container-login__box__lock-icon' />
                    <label>
                        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <button className='container-login__box__login-button' onClick={handleLogin}>LOGIN</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className='container-login__box__signup-area'>
                    <p>Not a member? </p>
                    <p className='container-login__box__signup-button' onClick={handleSigninClick}> Signup</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
