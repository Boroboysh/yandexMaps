import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import pointerReducer from "../features/pointer/pointerSlice";
import loginReducer from "../features/login/loginSlice";

export default configureStore({
    reducer: {
        pointer: pointerReducer,
        login: loginReducer,
        // [authApi.reducerPath]: authApi.reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});

// setupListeners(store.dispatch)