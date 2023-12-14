// Import necessary modules
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import configure from '../components/configure';

// Define RootState interface
interface RootState {
    isBasketActive: ReturnType<typeof configure>;
    allBasket: ReturnType<typeof configure>;
}

// Combine reducers
const rootReducer = combineReducers({
    isBasketActive: configure,
    allBasket: configure,
});

// Configure the Redux store
const store = configureStore({
    reducer: rootReducer,
});

// Export the store and RootState
export { store };
export type { RootState };
