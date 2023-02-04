import React, {useState} from "react";
import "./main.css";
import {GeolocationControl, Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setLatitude, setLongitude, setName} from "../../redux/features/pointer/pointerSlice";
import {TextField} from "@consta/uikit/TextField";
import {Button} from "@consta/uikit/Button";

let Main = ({isLogged}) => {
    let [state, setState] = useState([]);
    let [editStatus, setEditStatus] = useState(false)

    const pointerSelector = useSelector(state => state.pointer)
    const dispatch = useDispatch();

    //TODO useEffect Redux

    let addNewPoint = () => {
        // state => change state => update state => state
        //
    }

    let editPointer = (namePoint) => {
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

    async function create_token() {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // Profile...
            console.log('Token created')
        });
    }

    async function logout() {
        await axios.get('http://localhost:8000/auth/logout').then(response => {
            // Profile...
            console.log(response)

        });
    }

    if (!isLogged) {

        return (
            <div>
                <h3>
                    Информация о проекте
                </h3>
            </div>
        )
    }


    return (
        <div className="wrap">
            <section className="buttonsWrapTest">
                <button className="buttonTest" onClick={create_token}>Create Token</button>
                <button className="buttonTest" onClick={logout}>Logout</button>
                <button className="buttonTest" onClick={() => {
                    console.log('Get List')
                }}>Get LIST</button>
            </section>
            <section className="locationListWrap">
                <form>
                    <label htmlFor="namePoint">
                        <TextField label="Название: "
                                   onChange={(e) => dispatch(setName(e.value))}
                                   type="text"
                                   value={pointerSelector.name}
                                   size="s"

                        />
                    </label>
                    <label htmlFor="longitude">
                        <TextField label="Долгота: "
                                   onChange={(e) => dispatch(setLongitude(e.value))}
                                   type="text"
                                   value={pointerSelector.longitude}
                                   size="s"
                        />
                    </label>
                    <label htmlFor="latitude">
                        <TextField label="Широта: "
                                   onChange={(e) => dispatch(setLatitude(e.value))}
                                   type="text"
                                   value={pointerSelector.latitude}
                                   size="s"
                        />
                    </label>
                </form>
                <Button label="Добавить" onClick={() => {
                    console.log('Add new')
                }} size="s" id="buttonAddNew"/>
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
                                                        /*editPost(point.namePoint)*/
                                                    }}>Готово
                                                    </button>
                                                    <button onClick={() => {
                                                        console.log('pox')
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
                                                        /*editPost(point.namePoint)*/
                                                    }}>Редактировать
                                                    </button>
                                                    <button onClick={() => {
                                                        console.log('Delete')
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