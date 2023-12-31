import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Button from 'react-bootstrap/Button';

import ProductPopup from './productPopup';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    explanation: string;
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
    setToastMessage
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
        const updatedBasket = sessionStorageBasket ? JSON.parse(sessionStorageBasket) : [];
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
        setSelectedProduct(product);
    };

    return (
        <div className='container-content__box-right'>
            <div className='container-content__box-right__products'>
                {products.filter(urunleriFiltrele).map((product, index) => (
                    <div className='container-content__box-right__products__top' key={index}>
                        <p onClick={() => handleProductClick(product)}>
                            {product.name || <Skeleton />}
                        </p>
                        <p>{product.price || <Skeleton />} TL</p>
                        <p>{product.explanation || <Skeleton />} </p>
                        <Button
                            variant='info'
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
