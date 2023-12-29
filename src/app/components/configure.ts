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
    islogin: string;
    deletePopup: boolean;
}

const initialState: ConfigureState = {
    basket: false,
    basketProducts: [],
    islogin: 'false',
    deletePopup: false,
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
        setIsLogin: (state, action: PayloadAction<string>) => {
            state.islogin = action.payload;
        },
        setDeletePopup: (state, action: PayloadAction<boolean>) => {
            state.deletePopup = action.payload;
        },
    },
});

export const { setBasket, setBasketProducts, setIsLogin, setDeletePopup } = configure.actions;

export default configure.reducer;
