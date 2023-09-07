import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import '../Styles/Login.css'; // Import the CSS file for styling

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        // Implement your login logic here
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={login}>
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
