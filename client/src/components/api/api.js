import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const signUp = createAsyncThunk(
    'auth/signUp',
    async (payload) => {
        const d = await axios.post(`/api/auth/sign-up`, {}, {auth: payload, withCredentials: true})
            .catch(({response}) => {
                return Promise.reject(`${response.status}:${response.data.error}`);
            })
        return d
    }
)

export const checkStatusApi = createAsyncThunk(
    'auth/status',
    async (payload) => {
        return await axios.get('http://localhost:8000/auth/status');
    });

export const loginApi = createAsyncThunk(
    'auth/login',
    async (payload) => {
        return await axios.post('http://localhost:8000/auth/login', payload, {
            withCredentials: true
        }).then((response) => {
            console.log(response.data)

            return response.data
        })
    })

export const logoutApi = createAsyncThunk(
    'auth/logout',
    async () => {
        return await axios.get('http://localhost:8000/auth/logout', {
            withCredentials: true
        })
    }
)


export const getPointerListApi = createAsyncThunk(
    'pointer/list',
    async (payload) => {
        await axios.get('http://localhost:8000/list', {
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data)

                debugger;

                return response.data;
            });
    }
)


/*export async function CheckStatusApi() {
    await axios.get('https://localhost:8080/auth/status')
        .then((response) => {
            console.log(response);
            return response.data
        });
}*/
/*

export async function LoginApi(UserObject, navigate, setLogged) {
    console.log('Process started')

    axios.defaults.withCredentials = true;

    await axios.post('http://localhost:8000/auth/login', UserObject)
        .then((response) => {
            console.log(response)
            setLogged(true);
            navigate('/');
        })
}

export async function RegisterApi(UserObject) {
    await axios.post('http://localhost:8000/auth/register', JSON.stringify(UserObject))
        .then((response) => {
            console.log(response)

            redirect('/');
        })
}

export async function AddNewPoint(newPointState) {

    axios.defaults.withCredentials = true;

    await axios.post('http://localhost:8000/new_point', newPointState)
        .then((response) => {
            console.log(response)
            GetPointerListApi();
        })
}

export async function DeletePointApi(id) {
    await axios.delete('http://localhost:8000/deletePoint', {data: {id: id}})
        .then(response => {
            console.log(response)
            GetPointerListApi();
        })
}

export async function GetPointerListApi() {

    // axios.defaults.withCredentials = true;

    await axios.get('http://localhost:8000/list')
        .then((response) => {
            return response.data
        })
}

export async function GetCurrentUsername() {
    await axios.get('http://localhost:8000/user/name')
        .then((response) => {
            console.log(response.data)
            return response.data
        })
}*/
