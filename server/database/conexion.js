import {createPool} from 'mysql2/promise'     
export const pool = new createPool({
    host:"localhost",
    database:"sistemaepidemiologico",
    password:"",
    user:"root",
    port:3306
    
});