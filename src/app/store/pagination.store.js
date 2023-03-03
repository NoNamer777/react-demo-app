import { createSlice } from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        page: 1,
        pageSize: 5,
        totalPages: undefined,
        sorting: {
            on: '',
            order: 'asc',
        },
    },
    reducers: {
        setSorting: (state, action) => {
            state.sorting = {
                ...state.sorting,
                ...action.payload,
            };
        },
        setTotalPages: (state, action) => {
            state.totalPages = Math.ceil(action.payload / 5);
        },
        gotToPreviousPage: (state) => {
            if (state.page === 1) return;
            state.page--;
        },
        goToNextPage: (state) => {
            if (state.page === state.totalPages) return;
            state.page++;
        },
        goToPage: (state, action) => {
            state.page = action.payload;
        },
    },
});

export const { setTotalPages, setSorting, gotToPreviousPage, goToNextPage, goToPage } = paginationSlice.actions;

export default paginationSlice.reducer;
