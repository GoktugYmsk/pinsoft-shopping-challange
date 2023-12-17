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
}

function Content() {
    const [filtre, setFiltre] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [fiyatAraligi, setFiyatAraligi] = useState<[number, number]>([0, 1000]);

    const isBasketActive = useSelector((state: RootState) => state.isBasketActive.basket);

    console.log('selectedCategories', selectedCategories)

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
            try {
                const productsResponse = await axios.get('https://pinsoft.onrender.com/products');
                const categoriesResponse = await axios.get('https://pinsoft.onrender.com/category');

                const productsData = productsResponse.data;
                const categoriesData = categoriesResponse.data;

                setAllProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, []);

    console.log('allProducts', allProducts)
    console.log('categories', categories)

    return (
        <>
            <div className={`container-content ${isBasketActive ? 'opacityActive' : ''}`}>
                <div className='container-content__box'>
                    <LeftContent
                        setFiltre={setFiltre}
                        fiyatAraligi={fiyatAraligi}
                        setFiyatAraligi={setFiyatAraligi}
                        categories={categories}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                    <RightContent products={allProducts} urunleriFiltrele={urunleriFiltrele} />
                </div>
            </div>
            {isBasketActive && <Basket />}
        </>
    );
}

export default Content;
