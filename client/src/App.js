import './App.css';
import {Route, Routes, useNavigate} from "react-router";
import Main from "./components/Main/Main";
import React, {useEffect} from "react";
import {presetGpnDefault, Theme} from "@consta/uikit/Theme";
import {Header, HeaderLogin, HeaderModule} from "@consta/uikit/Header";
import {Layout} from "@consta/uikit/Layout";
import {Text} from "@consta/uikit/Text";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@consta/uikit/Button";
import {checkAuthApi, create_token, logoutApi} from "./api/api";
import {YMaps} from "@pbe/react-yandex-maps";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {login, errorValidate, status} = useSelector(state => state.login);

    if (!window.localStorage.getItem('sanctum-csrf-status')) {
        //sanctum-csrf-status true / false
        create_token();
    }

    useEffect(() => {
        dispatch(checkAuthApi())
    }, [])

    return (
        <Theme preset={presetGpnDefault}>
            <Layout direction='column' style={{width: '100%', alignItems: 'center'}}>
                <Header leftSide={
                    <>
                        <HeaderModule>
                            <Text style={{cursor: "pointer"}} view="brand" onClick={() => navigate('/')}>
                                YMaps
                            </Text>

                        </HeaderModule>
                    </>
                } rightSide={
                    <>
                        <HeaderModule>
                            <HeaderLogin
                                isLogged={login }
                                personName={login}
                                onClick={() =>  login ? navigate('/profile') : navigate('/login')}
                                label='Войти'
                            />

                            {
                                login  ? <Button label="Выйти" onClick={() => dispatch(logoutApi())}/> : <></>
                            }
                        </HeaderModule>
                    </>
                }/>
            </Layout>
            <YMaps>
                <Routes>
                    <Route element={<Login isLogged={login} navigate={navigate} dispatch={dispatch}
                                           errorValidate={errorValidate}/>} path="/login"/>
                    <Route element={<Register isLogged={login} navigate={navigate} dispatch={dispatch} errorValidate={errorValidate} />}
                           path="/register"/>
                    <Route element={<Main isLogged={ login} dispatch={dispatch} status={status}/>} path="/"/>
                    <Route element={<Profile login={login}/>} path="/profile"/>
                </Routes>

            </YMaps>
        </Theme>

    );
}

export default App;
