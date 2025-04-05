import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"1221",
  database:"blog"
})



// export const db = mysql.createConnection({
//   host:process.env.HS,
//   user:process.env.RT,
//   password: process.env.PASS,
//   database:process.env.DBBASE
// })
