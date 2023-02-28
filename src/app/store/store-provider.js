import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './pagination.store';
import raceReducer from './race.store';

const store = configureStore({
    reducer: {
        races: raceReducer,
        pagination: paginationReducer,
    },
});

export default store;
