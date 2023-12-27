'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

import axios from 'axios';
import { GoLock } from 'react-icons/go';
import { FaRegUser } from 'react-icons/fa';

import { store } from '@/app/store/store';
import Header from '@/app/components/header';

import '../pages/signin/signin.scss'

interface SignupProps {
    onSignupSuccess: () => void;
}

const Signup: React.FC<SignupProps> = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = async () => {
        try {
            const response = await axios.post((process.env.NEXT_PUBLIC_API_URL + 'register'), {
                username: fullName,
                email: email,
                password: password,
            });

            if (response.status === 200) {
                router.push('/login');
            } else {
                console.error('Kullanıcı kaydedilemedi. Hata kodu:', response.status);
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
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
                    <label>
                        <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div className='container-signin__box__down-input' >
                    <GoLock className='container-signin__box__lock-icon' />
                    <label>
                        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <button className='container-signin__box__signin-button' onClick={handleSignup} >SIGN UP</button>
            </div>
        </div>
    );
};

export default Signup;
