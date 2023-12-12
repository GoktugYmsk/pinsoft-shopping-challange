import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBasket } from '../../configure';
import { RootState } from '@/app/store/store';

import Button from 'react-bootstrap/Button';
import './index.scss';


function Basket() {
    const dispatch = useDispatch();

    const basketProducts = useSelector((state: RootState) => state.allBasket.basketProducts);


    const handleCloseBasket = () => {
        dispatch(setBasket(false));
    };

    useEffect(() => {
        const handleGlobalClick = (event: MouseEvent) => {
            if (
                (event.target as HTMLElement).closest('.container-basket') ||
                (event.target as HTMLElement).closest('.container-header__navbar__icons__rigth')
            ) {
                return;
            }
            handleCloseBasket();
        };

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseBasket();
            }
        };

        document.addEventListener('click', handleGlobalClick);
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('click', handleGlobalClick);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className='container-basket'>
            <div className='container-basket__button'>
                <Button className='container-basket__exit-button' onClick={handleCloseBasket} variant="info">
                    X
                </Button>{' '}
            </div>
            <div className='container-basket__products'>
                <div className='container-basket__products__box'>
                    {basketProducts.map((product, index) => (
                        <div className='container-basket__products__box__alt' key={index}>
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Basket;
