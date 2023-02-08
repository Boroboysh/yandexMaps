import React, {useState} from 'react'
import {TextField} from "@consta/uikit/TextField";
import {Button} from "@consta/uikit/Button";
import {deletePointApi, updatePointApi} from "../../api/api";

const StateEditing = ({indexArray, point, dispatch, setCentredCoordinates, pointerSelector}) => {
    const [isEditing, setIsEditing] = useState(false);

    const [editName, setEditNamePoint] = useState();
    const [editLongitude, setEditLongitude] = useState();
    const [editLatitude, setEditLatitude] = useState();

    let updatePoint = (index) => {
        if (isEditing) {
            const newState = {
                name: editName ? editName : point.name,
                longitude: editLongitude ? editLongitude : point.longitude,
                latitude: editLatitude ? editLatitude : point.latitude,
            }

            dispatch(updatePointApi({
                id: pointerSelector.pointers[index].id,
                state: newState
            }))

            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
    }

    return (
        <section className="locationList__element">
            <section className="locationList__elemen__viewMode" style={{
                display: !isEditing ? '' : 'none'
            }}
                     onClick={() => setCentredCoordinates({
                         center: [point.longitude, point.latitude],
                         zoom: 9
                     })}>
                <span> {point.name} |</span>
                <span> {point.longitude} |</span>
                <span> {point.latitude} </span>
            </section>
            <section className="locationList__element__editMode" style={{
                display: isEditing ? '' : 'none'
            }}>
                <TextField value={editName}
                           label='Название'
                           placeholder={'Default: ' + point.name}
                           onChange={(e) => setEditNamePoint(e.value)}
                           size="xs"
                />
                <TextField value={editLongitude}
                           label='Долгота'
                           placeholder={'Default: ' + point.longitude}
                           onChange={(e) => setEditLongitude(e.value)}
                           size="xs"
                />
                <TextField value={editLatitude}
                           label='Широта'
                           placeholder={'Default: ' + point.latitude}
                           onChange={(e) => setEditLatitude(e.value)}
                           size="xs"
                />
            </section>

            <section className="locationList__element__buttons">
                <Button label="Редактировать"
                        size="s"
                        view="secondary"
                    // style={{marginRight: '5px '}}
                        onClick={() => updatePoint(indexArray )}
                />

                <Button label="Удалить"
                        view='secondary'
                        size='s'
                    // style={{margin: '5px'}}
                        onClick={() => dispatch(deletePointApi(point.id))}
                />
            </section>
        </section>
    )
}

export default StateEditing