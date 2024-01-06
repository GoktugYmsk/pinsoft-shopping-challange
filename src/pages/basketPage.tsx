'use client'
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { RiDeleteBin5Line } from 'react-icons/ri';

import Button from 'react-bootstrap/Button';

import { store } from '@/app/store/store';
import Header from '@/app/components/header';

import api from '../../intercepter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './basketPage/index.scss';

interface Product {
    id: number;
    name: string;
    explanation: string;
    price: number;
    category: { id: number; name: string };
    quantity: number;
    base64image: string;
}

const BasketPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();

    const userIDString = typeof window !== 'undefined' ? sessionStorage.getItem('userId') : null;
    const userID = userIDString ? parseFloat(userIDString) : 0;

    useEffect(() => {
        const addedBasketProducts = sessionStorage.getItem('basketProducts');
        if (addedBasketProducts) {
            const basketProducts: Product[] = JSON.parse(addedBasketProducts);
            setProducts(basketProducts);
        }
    }, []);

    const removeFromTheBasket = (productId: number) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
        sessionStorage.setItem('basketProducts', JSON.stringify(updatedProducts));
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        const updatedProducts = products.map((product) =>
            product.id === productId ? { ...product, quantity: newQuantity } : product
        );
        setProducts(updatedProducts);
        sessionStorage.setItem('basketProducts', JSON.stringify(updatedProducts));
    };

    const handleOnKeepShopping = () => {
        router.push('/main');
    };

    const handleCompleteOrder = async () => {
        try {
            const orderPayload =
            {
                name: products.length > 0 ? products[0].name : '',
                price: products.length > 0 ? products[0].price : 0,
                quantity: products.length > 0 ? products[0].quantity : 0,
                userId: userID,

            }
            const response = await api.post('/orders', orderPayload);

            console.log('response', response)

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setProducts([]);
            sessionStorage.removeItem('basketProducts');
        } catch (error) {
            console.error('Veri alınamadı:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/orders/${userID}`);

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.data;
            } catch (error) {
                console.error('Veriler alınamadı:', error);
            }
        };
        fetchData();
    }, []);

    const decodeBase64Image = (base64: string) => {
        try {
            const base64ImageData = base64.split(",")[1];
            const binaryString = atob(base64ImageData);

            const byteNumbers = new Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                byteNumbers[i] = binaryString.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
            const dataUrl = URL.createObjectURL(blob);

            return dataUrl;
        } catch (error) {
            console.error('Base64 decoding error:', error);
            return '';
        }
    };

    return (
        <>
            <Provider store={store}>
                <Header />
            </Provider>
            <div className='container-basketPage'>
                <div className='container-basketPage__tableBox'>
                    <div className='container-basketPage__tableBox__top'>
                        <h1>BASKET</h1>
                        <div className='container-basketPage__tableBox__top__main' >
                            {products.length > 0 ? (
                                <TableContainer className='container-basketPage__tableBox__box'>
                                    <Table >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Ürün Resmi</TableCell>
                                                <TableCell>Ürün adı</TableCell>
                                                <TableCell>Fiyatı</TableCell>
                                                <TableCell>Adeti</TableCell>
                                                <TableCell>Sepetten Çıkar</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow key={product.id}>
                                                    <TableCell>
                                                        {product.base64image && (
                                                            <img src={decodeBase64Image(product.base64image)} alt={product.name} />
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>{product.price}</TableCell>
                                                    <TableCell>
                                                        <input
                                                            type='number'
                                                            min='0'
                                                            value={product.quantity}
                                                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}
                                                            className='basket-quantity-input'
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton onClick={() => removeFromTheBasket(product.id)}>
                                                            <RiDeleteBin5Line className='delete-icons' />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <div className='container-basketPage__empty-basket'>
                                    <p>Sepetinizde henüz bir ürün bulunmamaktadır.</p>
                                    <Button onClick={handleOnKeepShopping} className='basket-keepShopping-button'>
                                        Alışverişe Devam Et
                                    </Button>
                                </div>
                            )}
                            <div className='container-basketPage__tableBox__down-buttons'>
                                {products.length > 0 && (
                                    <>
                                        <Button onClick={handleOnKeepShopping} className='basket-keepShopping-button'>
                                            Alışverişe Devam Et
                                        </Button>
                                        <Button onClick={handleCompleteOrder} className='basket-order-button'>Siparişi Tamamla</Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasketPage;
