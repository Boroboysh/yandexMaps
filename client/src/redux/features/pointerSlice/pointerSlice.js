import {createSlice} from "@reduxjs/toolkit";
import {createNewPoint, deletePointApi, getPointerListApi, updatePointApi} from "../../../api/api";

export const pointerSlice = createSlice({
    name: 'pointer',
    initialState: {
        pointers: [],
        status: 'idle'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPointerListApi.fulfilled, (state, {payload}) => {
                state.pointers = payload.data;
            })
            .addCase(getPointerListApi.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(getPointerListApi.rejected, (state) => {
            })


            .addCase(createNewPoint.fulfilled, (state, {payload}) => {
                state.pointers = payload.data
                alert('Point created');
            })
            .addCase(createNewPoint.pending, (state) => {
                state.status = 'pending'
            })


            .addCase(deletePointApi.fulfilled, (state, {payload}) => {
                state.pointers = payload.data
                alert('Deleted')
            })
            .addCase(deletePointApi.pending, (state) => {
                state.status = 'pending'
            })


            .addCase(updatePointApi.fulfilled, (state, {payload}) => {
                state.pointers = payload.data
                state.status = 'idle'

                alert('Updated');
            })
            .addCase(updatePointApi.pending, (state) => {
                state.status = 'pending'
            })

    }
})

export const {} = pointerSlice.actions;

export default pointerSlice.reducer;