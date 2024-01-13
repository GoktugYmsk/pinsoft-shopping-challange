'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';

import Button from 'react-bootstrap/Button';
import { IoIosReturnLeft } from "react-icons/io";

import api from '../../intercepter';
import { store } from '@/app/store/store';
import Header from '@/app/components/header';
import '../pages/addProduct/index.scss';

const AddProduct: React.FC = () => {
    const router = useRouter();
    const [photo, setPhoto] = useState<File | string>('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [explanation, setExplanation] = useState('');

    const mapCategoryToId = (selectedCategory: string): number => {
        switch (selectedCategory) {
            case 'Kitap':
                return 1;
            case 'Eletronik':
                return 2;
            case 'Giyim':
                return 3;
            default:
                return 0;
        }
    };

    const handleSaveClick = async () => {
        try {
            const categoryId = mapCategoryToId(category);

            let base64Image = '';
            if (typeof photo === 'string') {
                base64Image = photo;
            } else {
                const reader = new FileReader();

                reader.onloadend = () => {
                    base64Image = reader.result as string;
                };

                reader.readAsDataURL(photo as File);
            }

            const floatPrice: number = parseFloat(price);

            const response = await api.post('/products', {
                name: productName,
                price: floatPrice,
                explanation: explanation,
                categoryId: categoryId,
                base64Image: photo,
            });

            router.push('/adminPage');

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Veri gönderilemedi:', error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/products');

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.data;
            } catch (error) {
                console.error('Veri alınamadı: get isteği olan products', error);
            }
        };
        fetchData();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64Image = reader.result as string;;
                setPhoto(base64Image);
            };

            reader.readAsDataURL(file);
        }
    };

    const hadnleReturnClick = () => {
        router.push('/adminPage');
    };


    return (
        <>
            <Provider store={store}>
                <Header />
            </Provider>
            <div className='container-addProduct'>
                <div className='container-addProduct__table-box'>
                    <h1>ADD PRODUCT</h1>
                    <div className='container-addProduct__table-box__name-photo'>
                        <input
                            type='text'
                            placeholder='Product Name'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <label htmlFor='file-input'>
                            <input
                                id='file-input'
                                type='file'
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileChange(e)}
                            />
                            Add Photo
                        </label>
                    </div>
                    <div className='container-addProduct__table-box__price-category'>
                        <input
                            type='number'
                            placeholder='Price'
                            value={price}
                            onChange={(e) => setPrice((e.target.value))}
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value='' disabled>Category</option>
                            <option value='Eletronik'>Eletronik</option>
                            <option value='Giyim'>Giyim</option>
                            <option value='Kitap'>Kitap</option>
                        </select>
                    </div>
                    <textarea
                        placeholder='Write explanation here'
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                    ></textarea>
                    <div className='container-addProduct__table-box__down' >
                        <IoIosReturnLeft onClick={hadnleReturnClick} className='container-addProduct__table-box__down__icon' />
                        <Button onClick={handleSaveClick}>SAVE</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
