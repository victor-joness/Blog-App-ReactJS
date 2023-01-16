import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import "./Login.css"
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext); 

    //atualizando os input state de acordo com oq o usuario escreve
    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    //caso esteja tudo ok usamos o useNavigate para passar a gente para a tela de login
    //caso tenha algum error de já existir o email, passamos para o err state e caso ele exista a gente renderiza na tela
    const handleSumit =  async (e) => {
        e.preventDefault();
        try {
            await login(inputs)
            navigate("/");
        } catch (error) {
            setErr(error.response.data);
        }
    }


    return (
        <div className='auth'>
            <h1>Login</h1>
            <form>
                <input type="text" placeholder='UserName' name='username' onChange={handleChange}/>
                <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
                <button onClick={handleSumit}>Login</button>
                {err && <p>{err}</p>}
                <span><Link to="/register">Registre-se</Link></span>
            </form>
        </div>
    );
};

export default Login;