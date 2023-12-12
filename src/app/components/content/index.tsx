import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Basket from '../header/basket';
import LeftContent from './leftContent';
import RightContent from './rightContent';

import axios from 'axios';
import './index.scss';

interface RootState {
    isBasketActive: {
        basket: boolean;
    };
}

interface Product {
    id: number;
    name: string;
    price: number;
}

function Content() {
    const [filtre, setFiltre] = useState<string>('');
    const [fiyatAraligi, setFiyatAraligi] = useState<[number, number]>([0, 1000]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const isBasketActive = useSelector((state: RootState) => state.isBasketActive.basket);

    console.log('isBasketActive', isBasketActive);

    const urunleriFiltrele = (urun: Product) => {
        return (
            urun.name.toLowerCase().includes(filtre.toLowerCase()) &&
            urun.price >= fiyatAraligi[0] &&
            urun.price <= fiyatAraligi[1]
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pinsoft.onrender.com/products');
                const data = response.data;
                setAllProducts(data);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, []);
    console.log('allProducts', allProducts)

    return (
        <>
            <div className={`container-content ${isBasketActive ? 'opacityActive' : ''}`}>
                <div className='container-content__box'>
                    <LeftContent setFiltre={setFiltre} fiyatAraligi={fiyatAraligi} setFiyatAraligi={setFiyatAraligi} />
                    <RightContent products={allProducts} urunleriFiltrele={urunleriFiltrele} />
                </div>
            </div>
            {isBasketActive && <Basket />}
        </>
    );
}

export default Content;
