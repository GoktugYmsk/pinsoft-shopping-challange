import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import Head from 'next/head';
import { SlBasket } from 'react-icons/sl';
import { FiLogOut } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import Navbar from 'react-bootstrap/Navbar';

import api from '../../../../intercepter';
import './index.scss';

interface Role {
    username: string;
    id: number;
    role: {
        id: number;
        name: string;
    };
}

function Header() {
    const [isUser, setIsUser] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

    let islogin: string | null = null;
    const router = useRouter();

    const isBasketActive = useSelector((state: { isBasketActive: { basket: boolean } }) => state.isBasketActive.basket);
    const username = typeof window !== 'undefined' ? sessionStorage.getItem('username') : null;

    useEffect(() => {
        const fetchData = async () => {
            if (typeof window !== 'undefined') {
                islogin = localStorage.getItem('isLogin');
                let loggedIn = islogin === 'true';
                return loggedIn;
            }
        };
        fetchData().then((value) => {
            setIsLoggedIn(value);
        });
    }, [islogin]);
    const handleLogoutClick = async () => {
        sessionStorage.removeItem('productUpdate');
        sessionStorage.removeItem('userTokenTry');
        sessionStorage.removeItem('productID');
        localStorage.setItem('isLogin', String('false'));

        try {
            await router.push('/main');
            setTimeout(() => window.location.reload(), 2000);
        } catch (error) {
            console.error('Yönlendirme hatası:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/user_account');

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const roles: Role[] = await response.data;
                if (roles && isLoggedIn) {
                    const userRole = roles.find((role) => role.username === username);
                    if (userRole) {

                        if (userRole.role.name === 'user') {
                            const userID = userRole.id;
                            sessionStorage.setItem('userId', userID.toString());
                            setIsUser(true);
                        }
                    } else {
                        console.log('Kullanıcının rolü bulunamadı.');
                    }
                }
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };
        fetchData();
    }, [isLoggedIn, username]);

    const handleBasketClick = () => {
        router.push('/basketPage')
    }

    return (
        <>
            <Head>
                <title>Pinsoft Alışveriş</title>
                <link rel="icon" href="data:image/jpeg;base64,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" />
            </Head>
            <div className={`container-header ${isBasketActive ? 'opacityActive' : ''}`}>
                <div className="container-header__navbar">
                    <Navbar expand="lg" variant="dark">
                        <div className="container-header_navbar_icons">
                            <FaRegUser className="container-header_navbar__icons_left" />
                            {isLoggedIn &&
                                <p>{username}</p>
                            }
                            {isUser &&
                                <SlBasket onClick={handleBasketClick} className="container-header__navbar__icons__rigth" />
                            }
                            {isLoggedIn && (
                                <FiLogOut className="container-header_navbar__icons_logout" onClick={handleLogoutClick} />
                            )}
                        </div>
                    </Navbar>
                </div>
            </div>
        </>
    );
}

export default Header;