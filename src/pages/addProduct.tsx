'use client'
import React from 'react';
import '../pages/addProduct/index.scss'
import Header from '@/app/components/header';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';
import Button from 'react-bootstrap/Button';

const AddProduct: React.FC = () => {
    return (
        <>
            <Provider store={store} >
                <Header />
            </Provider>

            <div className='container-addProduct' >
                <div className='container-addProduct__table-box' >
                    <h1>ADD PRODUCT</h1>
                    <div className='container-addProduct__table-box__name-photo'>
                        <input type='text' placeholder='Product Name' />
                        <label htmlFor='file-input'>
                            <input type="text" placeholder='Add Photo' />
                        </label>
                        <input id='file-input' type='file' style={{ display: 'none' }} />
                    </div>

                    <div className='container-addProduct__table-box__price-category'>
                        <input type="number" placeholder='Price' />
                        <select>
                            <option disabled selected value="">Category</option>
                            <option value="Eletronik">Eletronik</option>
                            <option value="Giyim">Giyim</option>
                            <option value="Kitap">Kitap</option>
                        </select>
                    </div>


                    <textarea placeholder='Write explanation here' id="" ></textarea>
                    <Button>SAVE</Button>
                </div>
            </div>
        </>
    );
};
export default AddProduct;