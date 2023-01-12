import './App.css';
import {Route, Routes} from "react-router";
import Main from "./components/Main/Main";
import Register from "./components/Register/Register";

function App() {
    return (
        <section className="App">
            <Routes>
                <Route element={<Register />} path="/register"/>
                <Route element={<Main />} path="/"/>
            </Routes>
        </section>
    );
}

export default App;
