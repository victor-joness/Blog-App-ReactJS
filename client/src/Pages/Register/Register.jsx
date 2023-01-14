import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import "./Register.css"

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email:"",
        password: "",
    });

    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    //atualizando os input state de acordo com oq o usuario escreve
    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    //caso esteja tudo ok usamos o useNavigate para passar a gente para a tela de login
    //caso tenha algum error de já existir o email, passamos para o err state e caso ele exista a gente renderiza na tela
    const handleSumit =  async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", inputs);
            navigate("/login");
        } catch (error) {
            setErr(error.response.data);
        }
    }

    return (
        <div className='auth'>
            <h1>Registra-se</h1>
            <form>
                <input required type="text" placeholder='UserName' name='username' onChange={handleChange}/>
                <input required type="email" placeholder='Email' name="email" onChange={handleChange}/>
                <input required type="password" placeholder='Password' name="password" onChange={handleChange}/>
                <button onClick={handleSumit}>Register</button>
                {err && <p>{err}</p>}
                <span><Link to="/login">Login</Link></span>
            </form>
        </div>
    );
};

export default Register;