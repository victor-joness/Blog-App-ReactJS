import { db } from "../db.js";
import Jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  //selecionar todos os posts do banco de dados, seja eles com categoria ou sem, para isso fazemos a requisiçao
  //no caso da api o json que me retorna é a url com cat setada ou sem nenhuma categoria setada, e la no home a gente faz uma filtragem a partir disso
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  //somente um usuario que pode criar um post, então fazemso essa verificação pelo token
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("User Não Authenticado");

  Jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("token não é valido");

    const q =
      "INSERT INTO posts (`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post criado com sucesso");
    });
  });
};

export const deletePost = (req, res) => {
  //somente o usuario que criou pode deletar o post, então fazemso essa verificação pelo token
  const token = req.cookies.access_token;
  //se não existir token é pq não tem user logado (ele poderia burlar isso pela url, então pra isso que serve a verificação)
  if (!token) return res.status(401).json("User Não Authenticado");

  //vendo se o token é valido.
  Jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("token não é valido");

    //pegando o id do post, que eu recebo atraves do handleDelete la do front
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    //caso o postId e o userinfo.id for igual ele vai execultar o comando em sql.
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err)
        return res.status(403).json("Somente o author pode deletar o post");

      return res.status(200).json("Post deletado com sucesso");
    });
  });
};

export const updatePost = (req, res) => {
  //somente um usuario que pode criar um post, então fazemso essa verificação pelo token
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("User Não Authenticado");

  Jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("token não é valido");

    const postId = req.params.id;

    const q =
      "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `cat` = ? WHERE `id` = ? AND `uid` = ?";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
    ];
    db.query(q, [...values,postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post Atualizado com sucesso");
    });
  });
};
