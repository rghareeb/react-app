import { ExecOptions } from 'child_process';
import mysql from 'mysql2/promise';

export async function connectToDatabase() {

  // const connection = await mysql.createConnection({
  //   host: 'server168.web-hosting.com',
  //   user: 'mrcoycdg_developer',
  //   password: 'lrc;VlV~4oM%',
  //   database: 'mrcoycdg_drugwarehouse',
  //   port: 21098
  // });
   const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'drugwarehousedb',
    
  });
  return connection;


}