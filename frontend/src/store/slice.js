import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    points: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setPoints: (state, action) => {
            state.points = action.payload;
        },
        addPoint: (state, action) => {
            state.points.push(action.payload);
        },
    },
});

export const { setPoints, addPoint } = appSlice.actions;
export default appSlice.reducer;