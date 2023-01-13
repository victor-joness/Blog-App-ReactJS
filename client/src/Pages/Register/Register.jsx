import React from 'react'
import {Link} from "react-router-dom"
import "./Register.css"

const Register = () => {
    return (
        <div className='auth'>
            <h1>Registra-se</h1>
            <form>
                <input required type="text" placeholder='UserName'/>
                <input required type="email" placeholder='Email'/>
                <input required type="password" placeholder='Password'/>
                <button>Register</button>
                <p>Error de Registro!!</p>
                <span><Link to="/login">Login</Link></span>
            </form>
        </div>
    );
};

export default Register;