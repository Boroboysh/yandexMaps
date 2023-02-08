import './App.css';
import {Route, Routes, useNavigate} from "react-router";
import Main from "./components/Main/Main";
import React from "react";
import {presetGpnDefault, Theme} from "@consta/uikit/Theme";
import {Header, HeaderLogin, HeaderModule} from "@consta/uikit/Header";
import {Layout} from "@consta/uikit/Layout";
import {Text} from "@consta/uikit/Text";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@consta/uikit/Button";
import {create_token, logoutApi} from "./api/api";
import {YMaps} from "@pbe/react-yandex-maps";
import {setLogin} from "./redux/features/auth/authSlice";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {login, isLogged, errorValidate} = useSelector(state => state.login);

    if (!window.localStorage.getItem('sanctum-csrf-status')) {
        //true / false
        create_token();
    }

    if (window.localStorage.getItem('login_ymaps')) {
        dispatch(setLogin(window.localStorage.getItem('login_ymaps')))
    }

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
                                isLogged={isLogged}
                                personName={login}
                                onClick={() => isLogged ? navigate('/profile') : navigate('/login')}
                                label='Войти'
                            />

                            {
                                isLogged ? <Button label="Logout" onClick={() => dispatch(logoutApi())}/> : <></>
                            }
                        </HeaderModule>
                    </>
                }/>
            </Layout>
            <YMaps>
                <Routes>
                    <Route element={ <Login isLogged={isLogged} navigate={navigate} dispatch={dispatch} errorValidate={errorValidate}/> } path="/login"/>
                    <Route element={ <Register navigate={navigate} dispatch={dispatch} errorValidate={errorValidate}/> }  path="/register" />
                    <Route element={ <Main isLogged={isLogged} dispatch={dispatch}/> } path="/"/>
                    <Route element={ <Profile/> } path="/profile"/>
                </Routes>
            </YMaps>
        </Theme>

    );
}

export default App;
