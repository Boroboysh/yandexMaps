import './App.css';
import {Route, Routes, useNavigate} from "react-router";
import Main from "./components/Main/Main";
import React, {useEffect, useState} from "react";
import {presetGpnDefault, Theme} from "@consta/uikit/Theme";
import {Header, HeaderLogin, HeaderModule} from "@consta/uikit/Header";
import {Layout} from "@consta/uikit/Layout";
import {Text} from "@consta/uikit/Text";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {checkStatusApi, GetCurrentUsername} from "./components/api/api";
import Profile from "./components/Profile/Profile";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {login ,isLogged} = useSelector(state => state.login);

    // let [isLogged, setLogged] = useState(false);
    let [username, setUsername] = useState('Profile User');

    // const {data, error, isLoading} = useGetAuthStatus();

    useEffect(() => {

        // setLogged(true)
np
        if (isLogged === true) {
            setUsername(login)
        }

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
                            <HeaderLogin isLogged={isLogged}
                                         personName={username}
                                         onClick={() => isLogged ? navigate('/profile') : navigate('/login')}
                                         label='Войти'/>
                        </HeaderModule>
                    </>
                }/>
            </Layout>
            <Routes>
                <Route element={<Login navigate={navigate} dispatch={dispatch}/>} path="/login"/>
                <Route element={<Register navigate={navigate}/>} path="/register"/>
                <Route element={<Main isLogged={isLogged} />} path="/"/>
                <Route element={<Profile />} path="/profile"/>
            </Routes>

        </Theme>

    );
}

export default App;
