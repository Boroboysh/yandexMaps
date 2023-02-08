import {createSlice} from "@reduxjs/toolkit";
import {createNewPoint, deletePointApi, getPointerListApi, updatePointApi} from "../../../api/api";

export const pointerSlice = createSlice({
    name: 'pointer',
    initialState: {
        pointers: []
    },
    reducers: {
        editName: (state, {payload}) => {
            state.pointers[payload.indexElement].name = payload.name
        },
        editLongitude: (state, {payload}) => {
            console.log(`State : ${state.pointers[payload]}`)

        },
        editLatitude: (state, {payload}) => {
            console.log(`State : ${state.pointers[payload]}`)
        },
        updatePointerList: (state, {payload}) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPointerListApi.fulfilled, (state, {payload}) => {
                // debugger
                // console.log(payload);

                state.pointers = payload.data;

                // state = payload
            })

            .addCase(createNewPoint.fulfilled, (state, {payload}) => {
                // state.pointers.push(payload.data)
                // state.pointers = [...state.pointers, payload]
                state.pointers = payload.data
                alert('Point created');

            })

            .addCase(deletePointApi.fulfilled, (state, {payload}) => {
                state.pointers = payload.data
                alert('Deleted')
            })

            .addCase(updatePointApi.fulfilled, (state, {payload}) => {
                state.pointers = payload.data
                alert('Updated');

            })
    }
})

export const {editName, editLatitude, editLongitude, updatePointerList} = pointerSlice.actions;

export default pointerSlice.reducer;