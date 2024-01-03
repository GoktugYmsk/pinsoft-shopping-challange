'use client'
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';

import Table from 'react-bootstrap/Table';
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

    return (
        <>
            <Provider store={store}>
                <Header />
            </Provider>
            <div className='container-basketPage'>
                <div className='container-basketPage__tableBox'>
                    <div className='container-basketPage__tableBox__top'>
                        {products.length > 0 ? (
                            <Table className='container-basketPage__tableBox__box' striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Ürün Resmi</th>
                                        <th>Ürün adı</th>
                                        <th>Fiyatı</th>
                                        <th>Adeti</th>
                                        <th>Sepetten Çıkar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>Ürün resmi eklenecek</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <input
                                                    type='number'
                                                    min='0'
                                                    value={product.quantity}
                                                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}
                                                    className='basket-quantity-input'
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    onClick={() => removeFromTheBasket(product.id)}
                                                    className='basket-remove-button'
                                                >
                                                    Sepetten çıkar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
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
        </>
    );
};

export default BasketPage;
