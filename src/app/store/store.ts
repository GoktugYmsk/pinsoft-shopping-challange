import { configureStore, combineReducers } from '@reduxjs/toolkit';
import configure from '../components/configure'

interface RootState {
    isBasketActive: ReturnType<typeof configure>;
    allBasket: ReturnType<typeof configure>;
}

const rootReducer = combineReducers({
    isBasketActive: configure,
    allBasket: configure,
});

const store = configureStore({
    reducer: rootReducer,
});

export { store };

export type { RootState };
