'use client';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Button from 'react-bootstrap/Button';
import api from '../../intercepter';
import { store } from '@/app/store/store';
import Header from '@/app/components/header';
import '../pages/addProduct/index.scss';
import { useRouter } from 'next/navigation';

const AddProduct: React.FC = () => {
    const router = useRouter();
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
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

            const response = await api.post('/products', {
                name: productName,
                price: price,
                explanation: explanation,
                categoryId: categoryId,
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
