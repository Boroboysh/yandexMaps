import {createSlice} from "@reduxjs/toolkit";
import {getPointerListApi} from "../../../components/api/api";

export const pointerSlice = createSlice({
    name: 'pointer',
    initialState: [],
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPointerListApi.fulfilled, (state, {payload}) => {
                debugger
                console.log(payload);


                // state = payload
            })
    }
})

export const { setName, setLongitude, setLatitude, editPointer} = pointerSlice.actions;

export default pointerSlice.reducer;