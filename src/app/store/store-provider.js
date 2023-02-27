import { configureStore } from '@reduxjs/toolkit';
import raceReducer from './race.store';

const store = configureStore({
    reducer: {
        races: raceReducer,
    },
});

export default store;
