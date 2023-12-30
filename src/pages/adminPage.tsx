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
import DeleteProductPopup from './adminPage/deleteProductPopup';


import './adminPage/index.scss'
// import * as XLSX from 'xlsx';


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
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const [toastActive, setToastActive] = useState(false)
    const [deletedProductId, setDeletedProductId] = useState<number>();


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


    // const exportToExcel = () => {
    //     try {
    //         const ws = XLSX.utils.json_to_sheet(productsData);
    //         const wb = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //         XLSX.writeFile(wb, 'products.xlsx');
    //     } catch (error) {
    //         console.error('Excel dosyasına dönüştürme hatası:', error);
    //     }
    // };

    const handleDeleteClick = (productId: number) => {
        setIsDeletePopup(true);
        // Seçilen ürünün id'sini DeleteProductPopup bileşenine iletiyoruz
        setDeletedProductId(productId);
    };


    const handleEditClick = (productId: number) => {
        sessionStorage.setItem('productID', String(productId));
        router.push('/updateProducts');
    };



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
                            <Button
                                className='container-adminPage__tableBox__top__buttons__right'
                                variant="link"
                            // onClick={exportToExcel}
                            >
                                Export To Excel
                            </Button>
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
                                <th>Actions</th>
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
                                    <td className='table-down' >
                                        <RiDeleteBin5Line onClick={() => handleDeleteClick(item.id)} className='delete-icons' />
                                        <CiEdit onClick={() => handleEditClick(item.id)} className='edit-icons' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            {isDeletePopup &&
                <DeleteProductPopup setIsDeletePopup={setIsDeletePopup} setToastActive={setToastActive} deletedProductId={deletedProductId} />
            }
            {

            }
            {toastActive && (
                <div className="toast-container">
                    <Toast onClose={() => setToastActive(false)} show={toastActive} autohide>
                        <Toast.Body>Data deleted succesfully!</Toast.Body>
                    </Toast>
                </div>
            )}
        </>
    );
};

export default AdminPage;
