import { query } from "express";
import { db } from "../db.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const register = (req, res) => {
  //checagem se ja tem user
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.name], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User ja existe");

    //hash da senha
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return err.json(err);
      return res.status(200).json("User Criado com sucesso");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if(err) return res.json(err);
    if(data.length == 0) return res.status(404).json("User Não existe");

    //descriptar a senha
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    //caso retorne false
    if(!isPasswordCorrect) return res.status(400).json("Username ou senha errada");
    //caso retorne true, usamos jwt junto com cokies para criar um token de acesso do usuario, a partir desse token vamos ter o userid e a partir disso fazer novas postagem etc
    const token = Jwt.sign({id:data[0].id}, "jwtkey");

    const {password, ...other} = data[0]

    res.cookie("access_token", token, {httpOnly:true}).status(200).json(other);
  });

};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite:"none",
    secure: true
  }).status(200).json("User Deslogado com sucesso")
};
