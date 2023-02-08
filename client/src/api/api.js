import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const checkStatusApi = createAsyncThunk(
    'auth/status',
    async (payload) => {
        return await axios.get('http://localhost:8000/auth/status');
    });

export const registerApi = createAsyncThunk(
    'auth/register',
    async (payload) => {
        let response = await axios.post('http://localhost:8000/auth/register', payload, {
            withCredentials: true
        })

        return response
    }
);

export const loginApi = createAsyncThunk(
    'auth/auth',
    async (payload) => {
        let response = await axios.post('http://localhost:8000/auth/login', payload, {
            withCredentials: true
        })

        return response
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
    'point/list',
    async (payload) => {
        let response = await axios.get('http://localhost:8000/point/list', {
            withCredentials: true
        })

        return response
    }
)

export const createNewPoint = createAsyncThunk(
    'point/new',
    async (payload) => {
        let response = await axios.post('http://localhost:8000/point/new', payload, {
            withCredentials: true
        })

        return response
    }
);

export const deletePointApi = createAsyncThunk(
    'point/delete',
    async (payload) => {
        let response = await axios.delete('http://localhost:8000/point/delete/' + payload, {
            withCredentials: true
        })

        return response
    }
);

export const updatePointApi = createAsyncThunk(
    'point/update',
    async (payload) => {
        let response = await axios.patch('http://localhost:8000/point/update/' + payload.id, payload.state, {
            withCredentials: true
        })

        return response
    }
);

export async function create_token() {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
        // Profile...
        window.localStorage.setItem('sanctum-csrf-status', 'true')
    });
}
