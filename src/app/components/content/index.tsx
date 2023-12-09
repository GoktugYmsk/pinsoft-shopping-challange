'use client'
import React, { useState } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';

interface Product {
    isim: string;
    fiyat: number;
}

function Content() {
    const [filtre, setFiltre] = useState<string>('');
    const [fiyatAraligi, setFiyatAraligi] = useState<[number, number]>([0, 1000]);

    const urunleriFiltrele = (urun: Product): boolean => {
        return (
            urun.isim.toLowerCase().includes(filtre.toLowerCase()) &&
            urun.fiyat >= fiyatAraligi[0] &&
            urun.fiyat <= fiyatAraligi[1]
        );
    };

    const products: Product[] = [
        { isim: 'Ürün 1', fiyat: 50 },
        { isim: 'Ürün 2', fiyat: 75 },
        { isim: 'Ürün 2', fiyat: 750 },
        { isim: 'Ürün 2', fiyat: 800 },
        { isim: 'Ürün 2', fiyat: 600 },
        { isim: 'Ürün 2', fiyat: 502 },
        { isim: 'Ürün 2', fiyat: 443 },
    ];

    return (
        <>
            <div className='container-content '>
                <div className='container-content__box'>
                    <div className='container-content__box-left'>
                        <div className='container-content__box-left__filter'>
                            <h3>Filtrele</h3>
                            <InputGroup className="mb-3">
                                <Input
                                    placeholder="Ürün adı veya filtrele"
                                    aria-label="search"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => setFiltre(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                        <div className='container-content__box-left__top'>
                            <label>
                                <input type='checkbox' />
                                <p>Kitap</p>
                            </label>

                            <label>
                                <input type='checkbox' />
                                <p>Elektronik</p>
                            </label>

                            <label>
                                <input type='checkbox' />
                                <p>Giyim</p>
                            </label>
                        </div>
                        <div className="container-content__box-left__down__filter">
                            <label>Fiyat Aralığı:</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={fiyatAraligi[1]}
                                onChange={(e) => setFiyatAraligi([fiyatAraligi[0], parseInt(e.target.value, 10)])}
                            />
                            <div className="container-content__box-left__down__filter__result">
                                <span>Min: {fiyatAraligi[0]}</span>
                                <span>Max: {fiyatAraligi[1]}</span>
                            </div>
                        </div>
                    </div>
                    <div className='container-content__box-right'>
                        <div className='container-content__box-right__products'>
                            {products.filter(urunleriFiltrele).map((product, index) => (
                                <div className='container-content__box-right__products__top' key={index}>
                                    <p>{product.isim} - {product.fiyat} TL</p>
                                    <Button color="info">Sepete Ekle</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Content;
