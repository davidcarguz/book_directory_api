const dotenv = require('dotenv');
dotenv.config();
const { Client } = require('pg');

async function connect(){
    try{
        const client = new Client({
            host: process.env.DB_HOST,
            port: 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'book_directory'
        });
        await client.connect();
        return client;
    }catch(e){
        throw new Error(`connection error: ${e}`);
    }
}

module.exports = connect;