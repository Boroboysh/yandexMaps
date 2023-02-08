import {createSlice} from "@reduxjs/toolkit";
import {checkAuthApi, loginApi, logoutApi, registerApi} from "../../../api/api";

export const authSlice = createSlice({
        name: 'login',
        initialState: {
            login: undefined,
            status: 'idle',
            errorValidate: []
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(checkAuthApi.fulfilled, (state, {payload}) => {
                    state.login = payload.data.name;
                    state.status = 'idle';
                })
                .addCase(checkAuthApi.pending, (state) => {
                    state.status = 'pending';
                })
                .addCase(checkAuthApi.rejected, (state) => {
                    state.status = 'idle';
                })


                .addCase(loginApi.pending, (state) => {
                    state.status = 'pending';
                })
                .addCase(loginApi.fulfilled, (state, {payload}) => {
                    let indexArray = 0;
                    let errorsArray = []

                    for (let key in payload.data.error) {
                        errorsArray[indexArray] = payload.data.error[key][0]
                        indexArray++;
                    }

                    // clearing current errors
                    state.errorValidate = []
                    state.errorValidate = errorsArray

                    if (state.errorValidate.length === 0) {
                        state.login = payload.data.name;

                        alert('You are logged in')
                    }

                })
                .addCase(loginApi.rejected, (state) => {
                    alert('Timeout');
                })

                .addCase(logoutApi.fulfilled, (state) => {
                    state.login = undefined;
                    state.status = 'idle';
                })
                .addCase(logoutApi.pending, (state) => {
                    state.status = 'pending';
                })
                // .addCase(logoutApi)

                .addCase(registerApi.fulfilled, (state, {payload}) => {
                    let indexArray = 0;
                    let errorsArray = []

                    for (let key in payload.data.error) {
                        errorsArray[indexArray] = payload.data.error[key][0]
                        indexArray++;
                    }

                    // clearing current errors
                    state.errorValidate = []

                    // output current errors
                    state.errorValidate = errorsArray

                    alert(payload.data)
                })
        }
    }
)

export const {} = authSlice.actions;

export default authSlice.reducer;