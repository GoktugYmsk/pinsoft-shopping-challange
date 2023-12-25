import React, { useEffect, useState } from 'react';
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
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

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

    const handleLogoutClick = () => {
        localStorage.setItem('isLogin', String('false'));
        sessionStorage.removeItem('userTokenTry');
        console.log('Çıkış yapıldı');
        router.push('/main');
        console.log('Maine Yönlendiriliyor')
        window.location.reload();
    };

    return (
        <div className={`container-header ${isBasketActive ? 'opacityActive' : ''}`}>
            <div className="container-header__navbar">
                <Navbar expand="lg" variant="dark">
                    <div className="container-header_navbar_icons">
                        <FaRegUser className="container-header_navbar__icons_left" />
                        <SlBasket onClick={() => dispatch(setBasket(true))} className="container-header_navbaricons_right" />
                        {isLoggedIn && (
                            <FiLogOut className="container-header_navbar__icons_logout" onClick={handleLogoutClick} />
                        )}
                    </div>
                </Navbar>
            </div>
        </div>
    );
}

export default Header;