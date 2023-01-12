import React from "react";
import styles from './register.module.css'
import {GeolocationControl, Placemark, YMaps} from "@pbe/react-yandex-maps";

let Login = () => {
    return (
        <div className={styles.wrap}>
            <YMaps>
                <div>Ты здесь:</div>
                <Login defaultState={{center: [55.75, 37.57], zoom: 9}}>
                    <Placemark defaultGeometry={[55.751574, 37.573856]}/>
                    <GeolocationControl options={{float: "right"}}/>
                </Login>
            </YMaps>'
        </div>
    )
}

export default Login;