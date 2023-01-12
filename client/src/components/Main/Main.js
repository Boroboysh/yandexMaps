import React, {useEffect, useState} from "react";
import styles from './main.css'
import {GeolocationControl, Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import axios from "axios";

let Main = () => {
    let [state, setState] = useState([]);
    let [newPointState, setNewPointState] = useState({
        namePoint: "",
        longitude: 0,
        latitude: 0,
    })
    let [editStatus, setEditStatus] = useState(false)

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

        setNewPointState({
            ...newPointState, [name]: value
        })
    }

    let editPost = (namePoint) => {
        if (editStatus) {
            setEditStatus(false)
        } else {
            setEditStatus(true)
        }

    }

    let editInputChange = (namePoint) => {
        state.filter((point) => {
            return point.namePoint === namePoint
        })
    }

    async function auth() {
        console.log('Process started')

        let user = {
            name: 'Tester1',
            password: 'test'
        }

        let json = JSON.stringify(user);

        await axios.post('http://127.0.0.1:8000/auth', json, config)
            .then((response) => {
                console.log(response)
            })
    }

    async function addNewPoint() {
        let jsonPoint = JSON.stringify(newPointState);

        await axios.post('http://127.0.0.1:8000/new_point', jsonPoint, config)
            .then((response) => {
                console.log(response)
                getPointerList();
            })
    }

    async function deletePoint(id) {
        await axios.delete('http://127.0.0.1:8000/deletePoint', {data: {id: id}})
            .then(response => {
                console.log(response)
                getPointerList();
            })
    }

    async function getPointerList() {
        await axios.get('http://127.0.0.1:8000/list')
            .then((response) => {
                setState(response.data)
            })
    }

    async function create_token() {
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
            // Login...
            console.log('Token created')
        });
    }

    async function logout() {
        await axios.get('http://127.0.0.1:8000/logout').then(response => {
            // Login...
            console.log(response)
        });
    }

    return (
        <div className="wrap">
            <section className="buttonsWrapTest">
                <button className="buttonTest" onClick={auth}>Auth</button>
                <button className="buttonTest" onClick={create_token}>Create Token</button>
                <button className="buttonTest" onClick={logout}>Logout</button>
                <button className="buttonTest" onClick={getPointerList}>Get LIST</button>
            </section>
            <section className="locationListWrap">
                <form>
                    <label htmlFor="namePoint">
                        Название: <input onChange={inputChange} type="text" name="namePoint"/>
                    </label>
                    <label htmlFor="longitude">
                        Долгота: <input onChange={inputChange} type="text" name="longitude"/>
                    </label>
                    <label htmlFor="latitude">
                        Широта: <input onChange={inputChange} type="text" name="latitude"/>
                    </label>
                </form>
                <button onClick={addNewPoint}>Добавить</button>
                <section className="locationList">
                    <div className="locationList__title">
                        <span>Название |</span>
                        <span> Долгота |</span>
                        <span> Широта</span>
                    </div>
                    <div>
                        {
                            state.map((point, index) => {
                                    if (editStatus) {
                                        return (
                                            <section key={index} className="locationList__element">
                                                <span> <input type="text" value={point.namePoint} onChange={() => {
                                                    editInputChange(point.namePoint)
                                                }}/> |</span>
                                                <span> <input type="text" value={point.longitude} onChange={() => {
                                                    editInputChange(point.namePoint)
                                                }}/> |</span>
                                                <span> <input type="text" value={point.latitude} onChange={() => {
                                                    editInputChange(point.namePoint)
                                                }}/> </span>
                                                <section className="locationList__element__buttons">
                                                    <button onClick={() => {
                                                        editPost(point.namePoint)
                                                    }}>Готово
                                                    </button>
                                                    <button onClick={() => {
                                                        deletePoint(point.id)
                                                    }}>Удалить
                                                    </button>
                                                </section>
                                            </section>
                                        )
                                    } else {
                                        return (
                                            <section key={index} className="locationList__element">
                                                <span> {point.name} |</span>
                                                <span> {point.longitude} |</span>
                                                <span> {point.latitude} </span>
                                                <section className="locationList__element__buttons">
                                                    <button onClick={() => {
                                                        editPost(point.namePoint)
                                                    }}>Редактировать
                                                    </button>
                                                    <button onClick={() => {
                                                        deletePoint(point.id)
                                                    }}>Удалить
                                                    </button>
                                                </section>
                                            </section>
                                        )
                                    }
                                }
                            )
                        }

                    </div>
                    <div>

                    </div>
                </section>
            </section>
            <section className="yandexMap">
                <YMaps>
                    <div>Ты здесь:</div>
                    <Map defaultState={{center: [55.75, 37.57], zoom: 9}}>
                        {

                            state.map((point) =>
                                <Placemark defaultGeometry={[point.longitude, point.latitude]}
                                           properties="balloonContent"/>
                            )
                        }
                        <GeolocationControl options={{float: "right"}}/>


                    </Map>
                </YMaps>
            </section>
        </div>
    )
}

export default Main;