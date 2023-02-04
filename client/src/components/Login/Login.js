import React, {useState} from "react";
import styles from './register.module.css'
import {Button} from "@consta/uikit/Button";
import {TextField} from "@consta/uikit/TextField";
import {Layout} from "@consta/uikit/Layout";
import {Text} from "@consta/uikit/Text";
import {loginApi} from "../api/api";


let Login = ({navigate, dispatch}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <div className={styles.wrap}>
            <Text>
                Вход
            </Text>
            <section>
                <form>
                    <Layout direction='column' >
                        <TextField onChange={(e) => setEmail(e.value)}
                                   label="Email"
                                   type="text"
                                   value={email}
                        />
                        <TextField onChange={(e) => setPassword(e.value)}
                                   label='Password'
                                   type="password"
                                   value={password} />
                    </Layout>

                </form>
                <Button label={'Войти'} view={'secondary'} onClick={() => dispatch(loginApi({email, password}))}/>

                <Text style={{cursor: "pointer"}} view="brand" onClick={() => navigate('/register')}>
                    Еще не зарегистрированы?
                </Text>

            </section>
        </div>
    )
}

export default Login;