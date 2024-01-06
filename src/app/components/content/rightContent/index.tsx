import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Button from 'react-bootstrap/Button';
import ProductPopup from './productPopup';

import './index.scss'

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    explanation: string;
    base64image: string;
}

interface RightContentProps {
    products: Product[];
    urunleriFiltrele: (urun: Product) => boolean;
    setToastActive: React.Dispatch<React.SetStateAction<boolean>>;
    setToastMessage: React.Dispatch<React.SetStateAction<string>>;
}

function RightContent({
    products,
    urunleriFiltrele,
    setToastActive,
    setToastMessage,
}: RightContentProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productInBasket, setProductInBasket] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const sessionStorageBasket = sessionStorage.getItem('basketProducts');
        const initialBasket = sessionStorageBasket ? JSON.parse(sessionStorageBasket) : [];
        const newProductInBasket: { [key: number]: boolean } = {};
        initialBasket.forEach((product: Product) => {
            newProductInBasket[product.id] = true;
        });
        setProductInBasket(newProductInBasket);
    }, []);

    const handleAddBasket = (product: Product) => {
        const sessionStorageBasket = sessionStorage.getItem('basketProducts');
        let updatedBasket = sessionStorageBasket ? JSON.parse(sessionStorageBasket) : [];

        if (!Array.isArray(updatedBasket)) {
            updatedBasket = [];
        }

        updatedBasket.push({ ...product, quantity: 1 });
        sessionStorage.setItem('basketProducts', JSON.stringify(updatedBasket));
        setProductInBasket((prev) => ({ ...prev, [product.id]: true }));
        setToastActive(true);
        setToastMessage('Ürün sepete eklendi!');
    };

    const handleRemoveFromCart = (productId: number) => {
        const sessionStorageBasket = sessionStorage.getItem('basketProducts');
        const updatedBasket = sessionStorageBasket ? JSON.parse(sessionStorageBasket) : [];
        const filteredBasket = updatedBasket.filter((product: Product) => product.id !== productId);
        sessionStorage.setItem('basketProducts', JSON.stringify(filteredBasket));
        setProductInBasket((prev) => ({ ...prev, [productId]: false }));
        setToastActive(true);
        setToastMessage('Ürün sepetten çıkarıldı!');
    };

    const handleProductClick = (product: Product) => {
        if (!document.activeElement?.classList.contains('container-content__box-right__products__button')) {
            setSelectedProduct(product);
        }
    };

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
        <div className='container-content__box-right'>
            <div className='container-content__box-right__products'>
                {products.filter(urunleriFiltrele).map((product, index) => (
                    <div onClick={() => handleProductClick(product)} className='container-content__box-right__products__top' key={index}>
                        {product.base64image && (
                            <img src={decodeBase64Image(product.base64image)} alt={product.name} />
                        )}
                        <p >{product.name || <Skeleton />}</p>
                        <p>{product.price || <Skeleton />} TL</p>
                        <p>{product.explanation || <Skeleton />} </p>

                        <Button
                            variant='info'
                            className='container-content__box-right__products__button'
                            onClick={() => {
                                const isProductInBasket = productInBasket[product.id];

                                if (isProductInBasket) {
                                    handleRemoveFromCart(product.id);
                                } else {
                                    handleAddBasket(product);
                                }
                            }}
                        >
                            {productInBasket[product.id] ? 'Sepetten Çıkar' : 'Sepete Ekle'}
                        </Button>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <ProductPopup product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            )}
        </div>
    );
}

export default RightContent;
