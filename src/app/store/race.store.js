import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SIZE_ORDER } from '../constants/race';

async function fetchRacesByName(raceNames) {
    const races = [];

    for (const raceName of raceNames) {
        const race = await (await fetch(`assets/data/races/${raceName}.json`)).json();
        races.push(race);
    }
    return races;
}

function sortRaceByAttribute(race1, race2, attribute) {
    switch (attribute) {
        case 'name':
            return race1.name.localeCompare(race2.name);
        case 'speed':
            const speedCompare = race1.speed - race2.speed;

            if (speedCompare === 0) {
                return race1.name.localeCompare(race2.name);
            }
            return speedCompare;
        case 'size':
            const sizeCompare = SIZE_ORDER[race1.size.toLowerCase()] - SIZE_ORDER[race2.size.toLowerCase()];

            if (sizeCompare === 0) {
                return race1.name.localeCompare(race2.name);
            }
            return sizeCompare;
        default:
            return 1;
    }
}

// Enables use of asynchronous code
export const fetchRaceData = createAsyncThunk('races/fetchData', async () => {
    const raceNames = await (await fetch('assets/data/races.json')).json();

    return await fetchRacesByName(raceNames);
});

// Creates a part of the store
export const raceSlice = createSlice({
    name: 'races',
    // Sets the initial values of this part of the store
    initialState: {
        data: [],
        filtered: [],
        active: [],
        isLoading: false,
        isInitialized: false,
        racialTraits: [],
    },
    reducers: {
        fetchPagedRaceData: (state, action) => {
            state.isLoading = true;

            const start = (action.payload.page - 1) * action.payload.pageSize;
            const end = action.payload.page * action.payload.pageSize;
            let races = [...state.data];

            if (action.payload.sorting) {
                if (action.payload.sorting.on) {
                    races.sort((r1, r2) => sortRaceByAttribute(r1, r2, action.payload.sorting.on));
                }
                if (action.payload.sorting.order === 'desc') {
                    races.reverse();
                }
            }
            if (action.payload.filters) {
                if (action.payload.filters.trait) {
                    races = races.filter((race) =>
                        race.traits
                            .map((trait) => trait.name.toLowerCase().replace(/ /gi, '-').replace(`'`, ''))
                            .includes(action.payload.filters.trait)
                    );
                }
            }
            state.filtered = [...races];
            state.active = state.filtered.slice(start, end);
            state.isLoading = false;
        },
    },
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

                state.racialTraits = state.data
                    .flatMap((race) => race.traits)
                    .map((trait) => ({
                        value: trait.name.replace(/ /gi, '-').replace(`'`, '').toLowerCase(),
                        label: trait.name,
                    }))
                    .sort((t1, t2) => t1.label.localeCompare(t2.label))
                    .filter(
                        (trait, position, self) => position === self.findIndex((entry) => entry.value === trait.value)
                    );

                if (!state.isInitialized) {
                    state.isInitialized = true;
                }
            });
    },
});

export const { fetchPagedRaceData } = raceSlice.actions;

export default raceSlice.reducer;
