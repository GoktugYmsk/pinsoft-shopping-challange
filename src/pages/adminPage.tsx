'use client'
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

import { CiEdit } from "react-icons/ci";
import Toast from 'react-bootstrap/Toast';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import { RiDeleteBin5Line } from "react-icons/ri";
import TableContainer from '@mui/material/TableContainer';


import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

import api from '../../intercepter';
import { store } from '@/app/store/store';
import Header from '@/app/components/header';
import DeleteProductPopup from './adminPage/deleteProductPopup';

import 'bootstrap/dist/css/bootstrap.min.css';
import './adminPage/index.scss'

interface Product {
    id: number;
    name: string;
    explanation: string;
    price: number;
    category: { id: number; name: string };
}

const AdminPage: React.FC = () => {
    const [toastMessage, setToastMessage] = useState('');
    const [toastActive, setToastActive] = useState(false)
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [deletedProductId, setDeletedProductId] = useState<number>();

    const router = useRouter();
    const updateProduct = typeof window !== 'undefined' ? sessionStorage.getItem('productUpdate') : null;

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
                setProductsData(data)
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, []);

    const exportToExcel = async () => {
        const dataToExport = productsData.map(item => ({
            Name: item.name,
            Explanation: item.explanation,
            Price: item.price,
            Category: item.category.name,
        }));

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Products');

        worksheet.addRow(['Name', 'Explanation', 'Price', 'Category']);

        dataToExport.forEach(item => {
            worksheet.addRow([item.Name, item.Explanation, item.Price, item.Category]);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        saveAs(blob, 'products.xlsx');
    };

    const handleDeleteClick = (productId: number) => {
        sessionStorage.removeItem('productUpdate');
        setIsDeletePopup(true);
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
                                onClick={exportToExcel}
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
                                        <TableCell>resim eklenecek</TableCell>
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
