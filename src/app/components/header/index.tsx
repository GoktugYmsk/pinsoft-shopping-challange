'use client'
import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { FaRegUser } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';

import { setBasket } from '../configure';


import './index.scss'

function Header() {

    const dispatch = useDispatch();

    const isBasketActive = useSelector((state: { isBasketActive: { basket: boolean } }) => state.isBasketActive.basket);

    return (
        <div className={`container-header ${isBasketActive ? 'opacityActive' : ''}`} >
            <div className='container-header__navbar'>
                <Navbar expand="lg" variant="dark">
                    <div className='container-header__navbar__icons' >
                        <FaRegUser className='container-header__navbar__icons__left' />
                        <SlBasket onClick={() => dispatch(setBasket(true))} className='container-header__navbar__icons__rigth' />
                    </div>
                </Navbar>
            </div>
        </div>
    )
}

export default Header