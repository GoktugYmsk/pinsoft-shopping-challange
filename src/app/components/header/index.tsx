'use client'
import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { FaRegUser } from 'react-icons/fa';
import { SlBasket } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { setBasket } from '../configure';
import { useRouter } from 'next/navigation';

import './index.scss';

function Header() {
    const dispatch = useDispatch();
    const router = useRouter();

    const isBasketActive = useSelector((state: { isBasketActive: { basket: boolean } }) => state.isBasketActive.basket);
    let islogin: string | null = null;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            islogin = localStorage.getItem('isLogin');
        }
    }, []);

    const handleLogoutClick = () => {
        router.push('/main');
    };

    const isLoggedIn = islogin === 'true';

    console.log('isLoggedIn', isLoggedIn);

    return (
        <div className={`container-header ${isBasketActive ? 'opacityActive' : ''}`}>
            <div className="container-header__navbar">
                <Navbar expand="lg" variant="dark">
                    <div className="container-header__navbar__icons">
                        <FaRegUser className="container-header__navbar__icons__left" />
                        <SlBasket onClick={() => dispatch(setBasket(true))} className="container-header__navbar__icons__right" />
                        {isLoggedIn &&
                            <FiLogOut className="container-header__navbar__icons__logout" onClick={handleLogoutClick} />
                        }
                    </div>
                </Navbar>
            </div>
        </div>
    );
}

export default Header;
