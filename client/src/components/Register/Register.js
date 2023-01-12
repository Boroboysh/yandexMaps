import React, {useState} from "react";
import styles from './register.module.css'
import {GeolocationControl, Placemark, YMaps} from "@pbe/react-yandex-maps";
import axios from "axios";

let Register = () => {
    let [formState, setFormState] = useState({});
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    axios.defaults.withCredentials = true;

    let inputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setFormState({
            ...formState, [name]: value
        })
    }

    async function register() {
        console.log('Process started')

        let user = {
            name: 'Tester1',
            password: 'test'
        }

        let json = JSON.stringify(user);

        await axios.post('http://127.0.0.1:8000/register', json, config)
            .then((response) => {
                console.log(response)
            })
    }


    return (
        <div className={styles.wrap}>
            Регистрация
            <section>
                <form>
                    <label htmlFor="login">
                        Login: <input type="text" name="name" onChange={inputChange}/>
                    </label>
                    <label htmlFor="password">
                        Password: <input type="password" name="password" onChange={inputChange}/>
                    </label>
                </form>
                <button onClick={register}>Зарегистрироваться</button>
            </section>
        </div>
    )
}

export default Register;