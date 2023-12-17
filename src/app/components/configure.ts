import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    price: number;
    image?: string;
}


interface ConfigureState {
    basket: boolean;
    basketProducts: Product[];
    islogin: boolean;
}

const initialState: ConfigureState = {
    basket: false,
    basketProducts: [],
    islogin: false,
};

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setBasket: (state, action: PayloadAction<boolean>) => {
            state.basket = action.payload;
        },
        setBasketProducts: (state, action: PayloadAction<Product[]>) => {
            state.basketProducts = action.payload;
        },
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.islogin = action.payload;
        },
    },
});

export const { setBasket, setBasketProducts, setIsLogin } = configure.actions;

export default configure.reducer;
