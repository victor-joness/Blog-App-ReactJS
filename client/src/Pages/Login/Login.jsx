import React from 'react'
import {Link} from "react-router-dom"
import "./Login.css"

const Login = () => {
    return (
        <div className='auth'>
            <h1>Login</h1>
            <form>
                <input type="text" placeholder='UserName'/>
                <input type="password" placeholder='Password'/>
                <button>Login</button>
                <p>Error de Login!!</p>
                <span><Link to="/register">Registre-se</Link></span>
            </form>
        </div>
    );
};

export default Login;