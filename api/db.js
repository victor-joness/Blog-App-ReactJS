import mysql from "mysql2"

export const db = mysql.createConnection({host:"localhost", user:"root", password: SENHADATABASE, database:"testes-blog-app"})