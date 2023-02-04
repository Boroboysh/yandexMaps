import React, {useState} from 'react';
import styles from "../Login/register.module.css";
import {Text} from "@consta/uikit/Text";
import {Layout} from "@consta/uikit/Layout";
import {TextField} from "@consta/uikit/TextField";
import {Button} from "@consta/uikit/Button";

const Register = ({navigate}) => {
    let [formState, setFormState] = useState({});

    const inputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setFormState({
            ...formState, [name]: value
        })
    }

    return (
        <div className={styles.wrap}>
            <Text>
                Регистрация
            </Text>
            <section>
                <form>
                    <Layout direction='column'>
                        <TextField label="Name" type="text" name="name" onChange={inputChange}/>
                        <TextField label="Email" type="email" name="email" onChange={inputChange}/>
                        <TextField label='Password' type="password" name="password" onChange={inputChange}/>
                    </Layout>

                </form>
                <Button label={'Зарегистрироваться'} view={'secondary'} onClick={() => {
                    console.log('Register')
                }}/>

                <Text style={{cursor: "pointer"}} view="brand" onClick={() => navigate('/login')}>
                    Уже зарегистрированы?
                </Text>

            </section>
        </div>
    );
};

export default Register;