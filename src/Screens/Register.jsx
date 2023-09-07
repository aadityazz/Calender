import { useState } from "react";
import '../Styles/Register.css'; // Import the CSS file for styling

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function register(ev) {
        // Implement your registration logic here
    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={register}>
                <h1>Register</h1>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
