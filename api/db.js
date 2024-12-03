import mysql from "mysql2"

// export const db = mysql.createConnection({
//   host:"localhost",
//   user:"root",
//   password:"1221",
//   database:"blog"
// })



// export const db = mysql.createConnection({
//   host:"sql12.freesqldatabase.com",
//   user:"sql12749407",
//   password:"EYWAvN1RnY",
//   database:"sql12749407"
// })



export const db = mysql.createPool({
  host:process.env.HS,
  user:process.env.RT,
  password: process.env.PASS,
  database:process.env.DBBASE
})

// databse sql on clever cloud