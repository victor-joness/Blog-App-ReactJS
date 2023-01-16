import React, { useEffect, useId, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import Menu from "../../Components/Menu/Menu";

import "./Single.css";

import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import moment from "moment";

const Single = () => {
  //apenas 1 post que vai ser renderizado então tiramos o [] e colocamos o {}
  const [post, setPost] = useState({});

  //useLocation pra pegar a url do post, esse url vem junto com o id router.get("/:id", getPost);
  const location = useLocation();
  const navigate = useNavigate();

  //pegando o postid
  const postId = location.pathname.split("/")[2];

  //user que está logado atualmente, usado para mostrar ou nao as opções de editar e delete
  const { currentUser } = useContext(AuthContext);

  //useEffect que é para execulta cada vez que for renderizado, ele pega o postId pelo location.pathname e filtra todos os posts por isso
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  //funcao que faz a requisição de delete direto na endpoint, ou seja apagando o post
  const handleDelete = async () => {
    try {
        await axios.delete(`/posts/${postId}`);
        navigate("/")        
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="infos">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {post.desc}
      </div>
      <Menu />
    </div>
  );
};

export default Single;
