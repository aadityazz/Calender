import { React, useState } from "react";
import '../Styles/Register.css';
import M from 'materialize-css'
import {Link, Navigate} from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isAdmin = 1;

    const register = async (event) => {
        event.preventDefault();
        //console.log("button hit")
        await fetch("http://localhost:5000/api/auth/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                password,
                email,
                isAdmin
            })
        }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error,classes:"#c62828 red darken-3"})
                }
                else{
                    M.toast({html:data.message,classes:"#43a047 green darken-1"})
                    return <Navigate to={'/login'} />;
                }
            }).catch(err=>{
            console.log(err)
        })
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
                <button type="submit">Register</button>
            </form>
            <p style={{fontFamily:"Raleway",marginLeft:"115px",fontSize:"17px"}}>
                <Link to="/login" style={{color:"grey",fontWeight:"600"}}>Already you have an account ?</Link>
            </p>
        </div>
    );
}
