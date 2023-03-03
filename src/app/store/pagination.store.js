import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_FILTERING_BY_TRAIT, DEFAULT_SORTING_ON_ATTRIBUTE, DEFAULT_SORT_ORDER } from '../constants/sorting';

/** Contains state data necessary for the pagination, and filters and the sorting of data. */
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
        filters: {
            trait: DEFAULT_FILTERING_BY_TRAIT,
        },
    },
    reducers: {
        setSorting: (state, action) => {
            state.sorting = {
                ...state.sorting,
                ...action.payload,
            };
        },
        setFilters: (state, action) => {
            state.filters = {
                ...state.filters,
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

export const { setTotalPages, setSorting, setFilters, goToPage } = paginationSlice.actions;

export default paginationSlice.reducer;
