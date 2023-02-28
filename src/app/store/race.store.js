import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Enables use of asynchronous code
export const initializeRaceData = createAsyncThunk('races/initialized', async () => {
    const raceNames = await (await fetch('assets/data/races.json')).json();
    const races = [];

    for (const raceName of raceNames) {
        const race = await (await fetch(`assets/data/races/${raceName}.json`)).json();
        races.push(race);
    }
    return races;
});

// Creates a part of the store
export const raceSlice = createSlice({
    name: 'races',
    // Sets the initial values of this part of the store
    initialState: {
        active: [],
        isLoading: false,
        isInitialized: false,
    },
    extraReducers: (builder) => {
        builder
            // Upon calling the initialization process, we'll reflect in the store state that the data is loading
            .addCase(initializeRaceData.pending, (state) => {
                state.isLoading = true;
            })
            // After the initialization process has completed, we'll update the store state with the received data
            // And update the loading and initialized flags accordingly
            .addCase(initializeRaceData.fulfilled, (state, action) => {
                state.active = [...action.payload];
                state.isLoading = false;

                if (!state.isInitialized) {
                    state.isInitialized = true;
                }
            });
    },
});

export default raceSlice.reducer;
