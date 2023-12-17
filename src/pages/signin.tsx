'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/app/components/header';
import { FaRegUser } from 'react-icons/fa';
import { GoLock } from 'react-icons/go';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';
import '../pages/signin/signin.scss'

interface SignupProps {
    onSignupSuccess: () => void;
}

const Signup: React.FC<SignupProps> = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = () => {

    };

    const handleSignin = () => {

    };

    const handleLoginClick = () => {
        router.push('/login');
    };

    return (
        <div className='container-signin' >
            <Provider store={store}>
                <Header />
            </Provider>
            <div className='container-signin__box' >
                <h1>REGISTER</h1>
                <div className='container-signin__box__top-input' >
                    <FaRegUser className='container-signin__box__user-icon' />
                    <label>
                        <input type="text" placeholder='Username' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </label>
                </div>
                <div className='container-signin__box__down-input' >
                    <GoLock className='container-signin__box__lock-icon' />
                    <label>
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <div className='container-signin__box__down-input' >
                    <GoLock className='container-signin__box__lock-icon' />
                    <label>
                        <input type="password" placeholder=' Rewrite Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <button className='container-signin__box__signin-button' onClick={handleSignin} >SIGN UP</button>
            </div>
        </div>
    );
};

export default Signup;
