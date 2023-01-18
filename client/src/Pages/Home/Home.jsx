import React, { useState } from "react";
import {Link, useLocation} from "react-router-dom"
import axios from "axios"

import "./Home.css"
import { useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  //me retorna a url, e a partir da url eu consigo saber qual categoria o usuario quer que seja filtrado
  const cat = useLocation().search;

  //useEffect que é para execulta cada vez que for renderizado, então toda vez que for renderizado ele vai fazer a requisção no endpoint /posts,
  //como são varios posts eles tem que ficar armazenado em array para ai sim eu renderizar com o .map do react, então meu estado de posts por padrao é um array
  //então temos que pegar a requisição e transformar em array, fazemos isso com res.data onde data é um array com nossos posts, a cada vez que é renderizado o home page
  //ele pega o setPosts e atualiza, fazemos isso criando uma funcao somento no useEffect e chamando ela uma vez.
  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await axios.get(`/posts/${cat}`);
          setPosts(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[cat]);

  /* const posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
      img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ]; */

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
                <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.desc)}</p>
                <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
