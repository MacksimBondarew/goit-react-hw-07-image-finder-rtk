import { configureStore } from '@reduxjs/toolkit';
import { contacts } from './contacts';
import { filterReducer } from './filter';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        [contacts.reducerPath]: contacts.reducer,
        filter: filterReducer,
    },
    middleware: getDefaultMiddleware => [
        ...getDefaultMiddleware(),
        contacts.middleware,
    ],
});

setupListeners(store.dispatch);