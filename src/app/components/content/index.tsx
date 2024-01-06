'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';

import api from '../../../../intercepter';
import LeftContent from './leftContent';
import RightContent from './rightContent';
import './index.scss';

interface RootState {
    isBasketActive: {
        basket: boolean;
    };
}

export interface Category {
    id: number;
    name: string;
}
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    explanation: string;
    base64image: string;
}

function Content() {
    const [filtre, setFiltre] = useState<string>('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastActive, setToastActive] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
    const [fiyatAraligi, setFiyatAraligi] = useState<[number, number]>([0, 1000]);

    const router = useRouter();

    const urunleriFiltrele = (urun: Product) => {
        return (
            urun.name.toLowerCase().includes(filtre.toLowerCase()) &&
            urun.price >= fiyatAraligi[0] &&
            urun.price <= fiyatAraligi[1] &&
            (selectedCategories.length === 0 || selectedCategories.includes(urun.id))
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            if (typeof window !== 'undefined') {
                let islogin = sessionStorage.getItem('userTokenTry');
                if (islogin) {
                    let loggedIn = true;
                    return loggedIn;
                }
                else if (!islogin) {
                    let loggedIn = false;
                    return loggedIn;
                }
            }
        };

        fetchData().then((value) => {
            setIsLoggedIn(value);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await api.get(process.env.NEXT_PUBLIC_API_URL + 'products');
                const categoriesResponse = await api.get(process.env.NEXT_PUBLIC_API_URL + 'category');

                const productsData = productsResponse.data;
                const categoriesData = categoriesResponse.data;

                console.log('productsData', productsData)

                setAllProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log('allProducts', allProducts);
    }, [])

    const handleSigninClick = () => {
        router.push('/login');
    }

    const hanleOrderClick = () => {
        router.push('/orderPage')
    }

    return (
        <>
            <div className='container-content'>
                <div className='container-content__box'>
                    <LeftContent
                        setFiltre={setFiltre}
                        fiyatAraligi={fiyatAraligi}
                        setFiyatAraligi={setFiyatAraligi}
                        categories={categories}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                    <RightContent products={allProducts} urunleriFiltrele={urunleriFiltrele} setToastActive={setToastActive} setToastMessage={setToastMessage} />
                </div>
                {!isLoggedIn &&
                    <Button className='container-content__signin-button' onClick={handleSigninClick} variant="light">Sign in</Button>
                }
                {isLoggedIn &&
                    <Button className='container-content__order-button' onClick={hanleOrderClick} variant="light">Siparişlerim</Button>
                }
            </div>
            {
                toastActive && (
                    <div className="toast-container">
                        <Toast onClose={() => setToastActive(false)} show={toastActive} autohide>
                            <Toast.Body>{toastMessage}</Toast.Body>
                        </Toast>
                    </div>
                )
            }
        </>
    );
}

export default Content;
