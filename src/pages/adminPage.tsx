'use client'
import React from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { store } from '@/app/store/store';
import Header from '@/app/components/header';
import './adminPage/index.scss'

const AdminPage: React.FC = () => {
    const router = useRouter();

    const addProductClick = () => {
        router.push('/addProduct');
    }

    return (
        <>
            <Provider store={store}>
                <Header />
            </Provider>
            <div className='container-adminPage'>
                <div className='container-adminPage__tableBox'>
                    <div className='container-adminPage__tableBox__top' >
                        <h2>Products</h2>
                        <div className='container-adminPage__tableBox__top__buttons'>
                            <Button onClick={addProductClick} className='container-adminPage__tableBox__top__buttons__left' variant="link">New Product</Button>
                            <Button className='container-adminPage__tableBox__top__buttons__right' variant="link">Export To Excel</Button>
                        </div>
                    </div>
                    <Table className='container-adminPage__tableBox__box' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Explanation</th>
                                <th>Price</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ürün resmi eklenecek</td>
                                <td>Madame çanta</td>
                                <td>Bordo çanta</td>
                                <td>150.60</td>
                                <td>Giyim</td>
                            </tr>
                            <tr>
                                <td>Ürün resmi eklenecek</td>
                                <td>Nokia 3310</td>
                                <td>Telefon</td>
                                <td>25.0</td>
                                <td>Elektronik</td>
                            </tr>
                            <tr>
                                <td>Ürün resmi eklenecek</td>
                                <td >Paranın Psikolojisi</td>
                                <td>Kitap</td>
                                <td>200.68</td>
                                <td>Kitap</td>
                            </tr>
                            {/* <tr>
                                <td>Ürün resmi eklenecek</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>Giyim</td>
                            </tr>
                            <tr>
                                <td>Ürün resmi eklenecek</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>Giyim</td>
                            </tr> */}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
