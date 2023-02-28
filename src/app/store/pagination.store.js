import { createSlice } from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        page: 1,
        pageSize: 5,
        totalPages: undefined,
    },
    reducers: {
        setTotalPages: (state, action) => {
            state.totalPages = Math.ceil(action.payload / 5);
        },
    },
});

export const { setTotalPages } = paginationSlice.actions;

export default paginationSlice.reducer;
