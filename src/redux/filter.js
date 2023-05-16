import { createSlice } from '@reduxjs/toolkit';

const state = {
    filter: '',
};

const filter = createSlice({
    name: 'state',
    initialState: state,
    reducers: {
        changeFilterContact(state, action) {
            state.filter = action.payload;
        },
    },
});

export const { changeFilterContact } = filter.actions;

export const filterReducer = filter.reducer;
