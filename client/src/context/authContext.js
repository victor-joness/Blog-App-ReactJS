import axios from "axios";
import {createContext, useEffect, useState} from "react"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async(inputs) => {
        const res = await axios.post("/auth/login", inputs);
        setCurrentUser(res.data);
    }

    const logout = async(inputs) =>{
        await axios.post("/auth/logout");
        setCurrentUser(null);
    } 

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]);

    //passando 3 funcoes para o authContextProvider como props/state, login, logout e current user, e depois usando eles no index,
    //la no index, vamos passar o app component como filho do authContextProvider, com isso o component app vai ter acesso a essas 3 funções e como o app é nosso
    //app inteiro, toda a nossa aplicação vai ter acesso a essas funcoes.
    return (<AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>)
};