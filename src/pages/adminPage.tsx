'use client'
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { CiEdit } from "react-icons/ci";
// import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { RiDeleteBin5Line } from "react-icons/ri";
import Toast from 'react-bootstrap/Toast';
import 'bootstrap/dist/css/bootstrap.min.css';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import { CiEdit } from '@mui/icons-material/Ci';
// import { RiDeleteBin5Line } from '@mui/icons-material/Ri';
// import Toast from '@mui/material/Toast';


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
    const [toastActive, setToastActive] = useState(false)
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [deletedProductId, setDeletedProductId] = useState<number>();


    const updateProduct = typeof window !== 'undefined' ? sessionStorage.getItem('productUpdate') : null;
    console.log('updateProduct', updateProduct);

    useEffect(() => {

        const updateToast = async () => {
            if (typeof window !== 'undefined') {
                if (updateProduct === 'true') {
                    setToastMessage('Data update succesfully!')
                    setToastActive(true);
                };
            };
        };
        updateToast();
    }, [updateProduct])

    const addProductClick = () => {
        sessionStorage.getItem('productUpdate');
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
        sessionStorage.removeItem('productUpdate');
        setIsDeletePopup(true);
        // Seçilen ürünün id'sini DeleteProductPopup bileşenine iletiyoruz
        setDeletedProductId(productId);
    };


    const handleEditClick = (productId: number) => {
        sessionStorage.removeItem('productUpdate');
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
                    <TableContainer className='container-adminPage__tableBox__box' component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Photo</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Explanation</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productsData.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>Resim eklenecek</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.explanation}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.category.name}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDeleteClick(item.id)}>
                                                <RiDeleteBin5Line className='delete-icons' />
                                            </IconButton>
                                            <IconButton onClick={() => handleEditClick(item.id)}>
                                                <CiEdit className='edit-icons' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            {isDeletePopup &&
                <DeleteProductPopup setIsDeletePopup={setIsDeletePopup} setToastActive={setToastActive} deletedProductId={deletedProductId} setToastMessage={setToastMessage} />
            }
            {toastActive && (
                <div className="toast-container">
                    <Toast onClose={() => setToastActive(false)} show={toastActive} autohide>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </div>
            )}
        </>
    );
};

export default AdminPage;
