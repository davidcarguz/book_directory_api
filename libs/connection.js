const dotenv = require('dotenv');
dotenv.config();
const pgp = require("pg-promise")();

const cn = {
    host: process.env.DB_HOST,
    port: 5432,
    database: 'book_directory',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10
};

function connect(){
    try{
        const db = pgp(cn);
        return db;
    }catch(e){
        console.error(e);
    }
}

module.exports = connect;
