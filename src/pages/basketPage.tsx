'use client'
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from '@/app/store/store';
import Header from '@/app/components/header';

import './basketPage/index.scss';
import { useRouter } from 'next/navigation';
import api from '../../intercepter';

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
        console.log('addedBasketProducts', addedBasketProducts);
        if (addedBasketProducts) {
            const basketProducts: Product[] = JSON.parse(addedBasketProducts);
            setProducts(basketProducts);
        }
    }, []);

    const handleOnKeepShopping = () => {
        router.push('/main');
    };

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

    const handleCompleteOrder = async () => {
        try {

            const orderPayload = products.map((product) => ({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                userId: userID,
            }));
            console.log('orderPayload', orderPayload)
            const response = await api.post('/orders', orderPayload);

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setProducts([]);
            sessionStorage.removeItem('basketProducts');

        } catch (error) {
            console.error('Veri alınamadı:', error);
        }
    }

    // order isteğine bakılacak


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
            </div >
        </>
    );
};

export default BasketPage;


