import {createSlice} from "@reduxjs/toolkit";
import {checkStatusApi, loginApi} from "../../../components/api/api";
import {useNavigate} from "react-router";

export const loginSlice = createSlice({
        name: 'login',
        initialState: {
            login: '',
            isLogged: false
            // status: false
        },
        reducers: {
            setEmail: (state, action) => {
                state.email = action.payload
                console.log(state.email)
            },
            setPassword: (state, action) => {
                state.password = action.payload
                console.log(state.password)
            },
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
                    // state.status = true;
                })

                .addCase(loginApi.pending, (state) => {
                    console.log('Pending...')
                })
                .addCase(loginApi.fulfilled, (state, {payload}) => {
                    // const navigate = useNavigate();

                    state.login = payload.login;
                    state.isLogged = payload.isLogged

                    // navigate('/')
                })
                .addCase(loginApi.rejected, (state) => {
                    console.log('Rejected')
                    // state.status = true;

                })
        }
    }
)

export const {setEmail, setPassword} = loginSlice.actions;

export default loginSlice.reducer;