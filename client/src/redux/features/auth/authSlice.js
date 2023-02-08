import {createSlice} from "@reduxjs/toolkit";
import {checkStatusApi, loginApi, logoutApi, registerApi} from "../../../api/api";

export const authSlice = createSlice({
        name: 'login',
        initialState: {
            login: '',
            isLogged: false,
            errorValidate: []
                // name: 'test',
                // email: '',
                // password: ''

            // status: false
        },
        reducers: {
            setIsLogged: (state, {payload}) => {
                state.isLogged = payload;

                window.localStorage.setItem('isLogged', payload);
            },
            setLogin: (state, {payload}) => {
                state.login = payload;

                window.localStorage.setItem('login_ymaps', payload)
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
                })


                .addCase(loginApi.pending, (state) => {
                    console.log('Pending...')
                })
                .addCase(loginApi.fulfilled, (state, {payload}) => {
                    let indexArray = 0;
                    let errorsArray = []

                    state.errorValidate.map(() => {})

                    for (let key in payload.data.error) {
                        errorsArray[indexArray] = payload.data.error[key][0]

                        indexArray++;
                    }

                    // clearing current errors
                    state.errorValidate = []

                    console.log(payload)
                    // output current errors
                    console.log(errorsArray)
                    state.errorValidate = errorsArray

                    if (state.errorValidate.length === 0) {
                        state.login = payload.data.login;
                        state.isLogged = payload.data.isLogged

                        window.localStorage.setItem('login_ymaps', payload.data.login)
                        window.localStorage.setItem('isLogged', true);

                        alert('Вы вошли! Теперь можете вернуться на главную')
                    }

                })
                .addCase(loginApi.rejected, (state) => {
                    console.log('Rejected')
                    // state.status = true;

                })

                .addCase(logoutApi.fulfilled, (state) => {
                    state.login = '';
                    state.isLogged = false

                    window.localStorage.removeItem('isLogged')
                })


                .addCase(registerApi.fulfilled, (state, {payload}) => {
                    let indexArray = 0;
                    let errorsArray = []

                    state.errorValidate.map(() => {})

                    for (let key in payload.data.error) {
                        errorsArray[indexArray] = payload.data.error[key][0]

                        indexArray++;
                    }

                    // clearing current errors
                    state.errorValidate = []

                    // output current errors
                    state.errorValidate = errorsArray
                })
        }
    }
)

export const {setIsLogged, setLogin} = authSlice.actions;

export default authSlice.reducer;