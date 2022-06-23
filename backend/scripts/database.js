const { Client } = require('pg');
const fs = require('fs');

require('dotenv').config({ path: '../.env' });
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_LOCALHOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

var sql = fs.readFileSync('../database/bank.sql').toString();
var sql2 = fs.readFileSync('../database/district.sql').toString();
var sql3 = fs.readFileSync('../database/region.sql').toString();
var sql4 = fs.readFileSync('../database/province.sql').toString();
var sql5 = fs.readFileSync('../database/sub_district.sql').toString();

client.connect().then(() => {
  console.log('Connected to database');
  Promise.all([
    client.query(sql),
    client.query(sql2),
    client.query(sql3),
    client.query(sql4),
    client.query(sql5),
  ])
    .then(() => {
      console.log('Database import successful');
      client.end();
    })
    .catch((e) => {
      console.log(e);
      client.end();
    });
});
