import {useContext, useEffect, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import '../Styles/Login.css'; // Import the CSS file for styling
import M from 'materialize-css';

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
            setRedirect(true);
        }
    }, []);

    const PostData = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/signin", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userInfo = await response.json();
                setUserInfo(userInfo);
                localStorage.setItem("user", JSON.stringify( userInfo));
                setRedirect(true);
            } else {
                const errorData = await response.json();
                M.toast({ html: errorData.error || 'Wrong credentials', classes: "#c62828 red darken-3" });
            }
        } catch (error) {
            console.error(error);
            M.toast({ html: 'An error occurred while processing your request', classes: "#c62828 red darken-3" });
        }
    }


    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={PostData}>
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p style={{ fontFamily: "Raleway", marginLeft: "115px", fontSize: "17px" }}>
                <Link to="/register" style={{ color: "grey", fontWeight: "600" }}>Don't have an account? Register here</Link>
            </p>
        </div>
    );
}
