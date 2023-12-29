'use client';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import Button from 'react-bootstrap/Button';

import api from '../../intercepter';
import { store } from '@/app/store/store';
import Header from '@/app/components/header';
import '../pages/updateProducts/index.scss';

const AddProduct: React.FC = () => {
    const [productName, setProductName] = useState('');
    // const [photo, setPhoto] = useState<File | string>('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [explanation, setExplanation] = useState('');
    const [idCount, setIdCount] = useState();

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];

    //     if (file) {
    //         setPhoto(file);
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/products');

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.data;
                console.log('data', data);
                const maxId = data.reduce((max: any, item: any) => Math.max(max, item.id), 0);
                setIdCount(maxId + 1);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, []);



    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await api.delete(`/product/${109}`);

    //             const data = await response.data;
    //         } catch (error) {
    //             console.error('Veri alınamadı:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    const handleSaveClick = async () => {
        try {
            const response = await api.put('/products', {
                name: productName,
                price: price,
                // You have to look at how can i do float types
                explanation: explanation,
                categoryId: idCount,
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Veri alınamadı:', error);
        }
    };

    return (
        <>
            <Provider store={store}>
                <Header />
            </Provider>
            <div className='container-updateProducts'>
                <div className='container-updateProducts__table-box'>
                    <h1>UPDATE PRODUCT</h1>
                    <div className='container-updateProducts__table-box__name-photo'>
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
                            // onChange={(e) => handleFileChange(e)}
                            />
                            Add Photo
                        </label>
                    </div>
                    <div className='container-updateProducts__table-box__price-category'>
                        <input
                            type='number'
                            placeholder='Price'
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
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
                    <Button onClick={handleSaveClick}>SAVE</Button>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
