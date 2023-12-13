import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ProductPopup from './productPopup';


import { setBasketProducts } from '../../configure';
import { useDispatch, useSelector } from 'react-redux';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    explanation: string;
}

interface RootState {
    allBasket: {
        basketProducts: Product[];
    };
}

interface RightContentProps {
    products: Product[];
    urunleriFiltrele: (urun: Product) => boolean;
}

function RightContent({ products, urunleriFiltrele }: RightContentProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productInBasket, setProductInBasket] = useState<{ [key: number]: boolean }>({});

    const dispatch = useDispatch();

    const basketProducts = useSelector((state: RootState) => state.allBasket.basketProducts);

    useEffect(() => {
        const newProductInBasket: { [key: number]: boolean } = {};
        basketProducts.forEach((product) => {
            newProductInBasket[product.id] = true;
        });
        setProductInBasket(newProductInBasket);
    }, [basketProducts]);

    const handleSepeteEkle = (product: Product) => {
        dispatch(setBasketProducts([...basketProducts, product]));
        setProductInBasket((prev) => ({ ...prev, [product.id]: true }));
    };

    const handleRemoveFromCart = (productId: number) => {
        const updatedBasket = basketProducts.filter((product) => product.id !== productId);
        dispatch(setBasketProducts(updatedBasket));
        setProductInBasket((prev) => ({ ...prev, [productId]: false }));
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    return (
        <div className='container-content__box-right'>
            <div className='container-content__box-right__products'>
                {products.filter(urunleriFiltrele).map((product, index) => (
                    <div className='container-content__box-right__products__top' key={index}>
                        <p onClick={() => handleProductClick(product)}>{product.name}</p>
                        <p>{product.price} TL</p>
                        <p>{product.explanation} TL</p>
                        <Button
                            variant='info'
                            onClick={() => {
                                const isProductInBasket = basketProducts.some((basketProduct) => basketProduct.id === product.id);

                                if (isProductInBasket) {
                                    handleRemoveFromCart(product.id);
                                } else {
                                    handleSepeteEkle(product);
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
