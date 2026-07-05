import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import appReducer from './slice';
import { apiSlice } from '../slice/apiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;