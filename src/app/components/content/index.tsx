import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Basket from '../header/basket';
import LeftContent from './leftContent';
import RightContent from './rightContent';
import './index.scss';

interface Product {
    id: number;
    name: string;
    fiyat: number;
}

interface RootState {
    isBasketActive: {
        basket: boolean;
    };
}

function Content() {
    const [filtre, setFiltre] = useState<string>('');
    const [fiyatAraligi, setFiyatAraligi] = useState<[number, number]>([0, 1000]);

    const isBasketActive = useSelector((state: RootState) => state.isBasketActive.basket);

    console.log('isBasketActive', isBasketActive);

    const urunleriFiltrele = (urun: Product) => {
        return (
            urun.name.toLowerCase().includes(filtre.toLowerCase()) &&
            urun.fiyat >= fiyatAraligi[0] &&
            urun.fiyat <= fiyatAraligi[1]
        );
    };

    const products: Product[] = [
        { name: 'Ürün 1', fiyat: 50, id: 1 },
        { name: 'Ürün 2', fiyat: 75, id: 2 },
        { name: 'Ürün 3', fiyat: 750, id: 3 },
        { name: 'Ürün 4', fiyat: 800, id: 4 },
        { name: 'Ürün 5', fiyat: 600, id: 5 },
        { name: 'Ürün 6', fiyat: 502, id: 6 },
        { name: 'Ürün 7', fiyat: 443, id: 7 },
        { name: 'Ürün 8', fiyat: 600, id: 8 },
    ];

    return (
        <>
            <div className={`container-content ${isBasketActive ? 'opacityActive' : ''}`}>
                <div className='container-content__box'>
                    <LeftContent setFiltre={setFiltre} fiyatAraligi={fiyatAraligi} setFiyatAraligi={setFiyatAraligi} />
                    <RightContent products={products} urunleriFiltrele={urunleriFiltrele} />
                </div>
            </div>
            {isBasketActive && <Basket />}
        </>
    );
}

export default Content;
