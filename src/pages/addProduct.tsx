'use client';
import React, { useEffect, useState } from 'react';
import '../pages/addProduct/index.scss';
import Header from '@/app/components/header';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';
import Button from 'react-bootstrap/Button';
import api from '../../intercepter';

const AddProduct: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [photo, setPhoto] = useState<File | string>('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [explanation, setExplanation] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setPhoto(file);
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
                console.log('data', data);
            } catch (error) {
                console.error('Veri alınamadı:', error);
            }
        };

        fetchData();
    }, []);

    const handleSaveClick = async () => {
        try {
            const response = await api.post('/register', {
                id: 2,
                name: productName,
                price: price,
                explanation: explanation,
                base64Image: photo,
                category: {
                    id: 12,
                    name: category,
                }
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
