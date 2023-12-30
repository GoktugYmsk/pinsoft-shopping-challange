'use client'
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { CiEdit } from "react-icons/ci";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { RiDeleteBin5Line } from "react-icons/ri";
import Toast from 'react-bootstrap/Toast';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../../intercepter';
import { store } from '@/app/store/store';
import Header from '@/app/components/header';


import './basketPage/index.scss'


interface Product {
    id: number;
    name: string;
    explanation: string;
    price: number;
    category: { id: number; name: string };
}



const BasketPage: React.FC = () => {



    return (
        <>
            <Provider store={store}>
                <Header />
            </Provider>
            <div className='container-basketPage'>
                <div className='container-basketPage__tableBox'>
                    <div className='container-basketPage__tableBox__top' >
                        <h2>Products</h2>
                        <div className='container-basketPage__tableBox__top__buttons'>
                            {/* <Button onClick={addProductClick} className='container-basketPage__tableBox__top__buttons__left' variant="link">New Product</Button> */}
                            <Button
                                className='container-basketPage__tableBox__top__buttons__right'
                                variant="link"
                            // onClick={exportToExcel}
                            >
                                Export To Excel
                            </Button>
                        </div>
                    </div>
                    <Table className='container-basketPage__tableBox__box' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Explanation</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default BasketPage;
