import {createSlice} from "@reduxjs/toolkit";
import {checkStatusApi, loginApi, logoutApi} from "../../../components/api/api";
import {useNavigate} from "react-router";

export const loginSlice = createSlice({
        name: 'login',
        initialState: {
            login: '',
            isLogged: false
            // status: false
        },
        reducers: {
        },
        extraReducers: (builder) => {
            builder
                .addCase(checkStatusApi.pending, (state) => {
                    console.log('Pending...')
                })
                .addCase(checkStatusApi.fulfilled, (state, {payload}) => {
                    console.log('Fulfilled')
                })
                .addCase(checkStatusApi.rejected, (state) => {
                    console.log('Rejected')
                })

                .addCase(loginApi.pending, (state) => {
                    console.log('Pending...')
                })
                .addCase(loginApi.fulfilled, (state, {payload}) => {
                    state.login = payload.login;
                    state.isLogged = payload.isLogged
                })
                .addCase(loginApi.rejected, (state) => {
                    console.log('Rejected')
                    // state.status = true;

                })

                .addCase(logoutApi.fulfilled, (state) => {


                    state.login = '';
                    state.isLogged = false
                })
        }
    }
)

// export const {setEmail, setPassword} = loginSlice.actions;

export default loginSlice.reducer;