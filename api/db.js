import mysql from "mysql2"

export const db = mysql.createConnection({host:"localhost", user:"root", password: process.env.REACT_APP_PASSWORD, database:"testes-blog-app"})