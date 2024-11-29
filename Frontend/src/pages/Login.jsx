import { useState } from "react";
import { useAuth } from "../AuthProvider";
import "../design/Login.css";

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    const [mensaje, setMensaje] = useState("");
    const auth = useAuth();
    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            try {
                auth.loginAction(input);
            } catch (error) {
                setMensaje(error.message);
            }
            return;
        }
        alert("El usuario y la contraseña es obligatorio");
    };
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <main id="Fondo">
            <div id="contenedor">
                <div>
                    <h1 id="h1-Login">Login</h1>
                </div>
                <div style={{ color: "red" }}>{mensaje}</div>
                <form onSubmit={handleSubmitEvent}>
                    <div className="form_control">
                        <label htmlFor="user-name">Usuario:</label>
                        <div id="input-box">
                            <input
                                type="text"
                                id="user-name"
                                name="username"
                                aria-describedby="user-name"
                                aria-invalid="false"
                                onChange={handleInput}
                            />
                        </div>
                    </div>
                    <div className="form_control">
                        <label htmlFor="password">Contraseña:</label>
                        <div id="input-box">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                aria-describedby="user-password"
                                aria-invalid="false"
                                onChange={handleInput}
                            />
                        </div>

                    </div>
                    <button className="btn-submit">Iniciar sesión</button>
                </form>
            </div>
        </main>
    );
};
export default Login;