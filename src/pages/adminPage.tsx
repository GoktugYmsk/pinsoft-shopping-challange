'use client'
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { store } from '@/app/store/store';
import Header from '@/app/components/header';
import './adminPage/index.scss'
import api from '../../intercepter';


interface Product {
    id: number;
    name: string;
    explanation: string;
    price: number;
    category: { id: number; name: string };
}



const AdminPage: React.FC = () => {
    const router = useRouter();
    const [productsData, setProductsData] = useState<Product[]>([]);


    const addProductClick = () => {
        router.push('/addProduct');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/products');

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.data;
                console.log('data', data);
                setProductsData(data)
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, []);

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
                            {productsData.map(item => (
                                <tr key={item.id}>
                                    <td>Resim eklenecek</td>
                                    <td>{item.name}</td>
                                    <td>{item.explanation}</td>
                                    <td>{item.price}</td>
                                    <td>{item.category.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
