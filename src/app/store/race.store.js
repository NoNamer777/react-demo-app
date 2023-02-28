import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

async function fetchRacesByName(raceNames) {
    const races = [];

    for (const raceName of raceNames) {
        const race = await (await fetch(`assets/data/races/${raceName}.json`)).json();
        races.push(race);
    }
    return races;
}

// Enables use of asynchronous code
export const fetchRaceData = createAsyncThunk('races/fetchData', async () => {
    const raceNames = await (await fetch('assets/data/races.json')).json();

    return await fetchRacesByName(raceNames);
});

export const fetchPagedRaceData = createAsyncThunk('races/fetchDataPage', async (payload) => {
    let raceNames = await (await fetch('assets/data/races.json')).json();

    const start = (payload.page - 1) * payload.pageSize;
    const end = payload.page * payload.pageSize;

    raceNames = raceNames.slice(start, end);

    return await fetchRacesByName(raceNames);
});

// Creates a part of the store
export const raceSlice = createSlice({
    name: 'races',
    // Sets the initial values of this part of the store
    initialState: {
        data: [],
        active: [],
        isLoading: false,
        isInitialized: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Upon calling the initialization process, we'll reflect in the store state that the data is loading
            .addCase(fetchRaceData.pending, (state) => {
                state.isLoading = true;
            })
            // After the initialization process has completed, we'll update the store state with the received data
            // And update the loading and initialized flags accordingly
            .addCase(fetchRaceData.fulfilled, (state, action) => {
                state.data = [...action.payload];
                state.isLoading = false;

                if (!state.isInitialized) {
                    state.isInitialized = true;
                }
            })
            .addCase(fetchPagedRaceData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPagedRaceData.fulfilled, (state, action) => {
                state.active = action.payload;
                state.isLoading = false;
            });
    },
});

export const {} = raceSlice.actions;

export default raceSlice.reducer;
