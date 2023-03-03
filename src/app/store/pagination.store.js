import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SORTING_ON_ATTRIBUTE, DEFAULT_SORT_ORDER } from '../constants/sorting';

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        page: 1,
        pageSize: 5,
        totalPages: undefined,
        sorting: {
            on: DEFAULT_SORTING_ON_ATTRIBUTE,
            order: DEFAULT_SORT_ORDER,
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
        goToPage: (state, action) => {
            state.page = action.payload;
        },
    },
});


export default paginationSlice.reducer;
