'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/header';

import './index.scss'
import { FaRegUser } from 'react-icons/fa';
import { GoLock } from "react-icons/go";


interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (username === 'user' && password === 'password') {
            onLoginSuccess();

            router.push('/main');
        } else {
            setError('Kullanıcı adı veya şifre hatalı');
        }
    };

    const handleSigninClick = () => {
        router.push('/signin');
    }

    return (
        <div className='container-login' >
            <Header />
            <div className='container-login__box' >
                <h1>WELCOME</h1>
                <div className='container-login__box__top-input' >
                    <FaRegUser className='container-login__box__user-icon' />
                    <label>
                        <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div className='container-login__box__down-input' >
                    <GoLock className='container-login__box__lock-icon' />
                    <label>
                        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <button className='container-login__box__login-button' onClick={handleLogin}>LOGIN</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className='container-login__box__signup-area' >
                    <p >Not a member ? </p>
                    <p className='container-login__box__signup-button' onClick={handleSigninClick}  > Signup</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
