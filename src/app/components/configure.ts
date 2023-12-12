import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    name: string;
    fiyat: number;
    image?: string;
}


interface ConfigureState {
    basket: boolean;
    basketProducts: Product[];
}

const initialState: ConfigureState = {
    basket: false,
    basketProducts: [],
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
    },
});

export const { setBasket, setBasketProducts } = configure.actions;

export default configure.reducer;
