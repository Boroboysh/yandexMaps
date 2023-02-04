import {createSlice} from "@reduxjs/toolkit";

export const pointerSlice = createSlice({
    name: 'pointer',
    initialState: {
        name: '',
        longitude: '',
        latitude: ''
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
            console.log(state.name)
        },
        setLongitude: (state, action) => {
            state.longitude = action.payload
        },
        setLatitude: (state, action) => {
            state.latitude = action.payload
        },
        editPointer: (state, action) => {

        }
    }
})

export const { setName, setLongitude, setLatitude, editPointer} = pointerSlice.actions;

export default pointerSlice.reducer;