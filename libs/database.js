const pgConnect = require('./connectionPg');

class Database {

    async addPerson (person){
        const pgConn = await pgConnect();
        const dbRes = await pgConn.query(`INSERT INTO people(person_name, person_lastname, email, phone, country, city, address) 
        VALUES('${person.name}','${person.lastname}','${person.email}','${person.phone}','${person.country}','${person.city}','${person.address}') RETURNING person_id`);
        return dbRes.rows[0];
    }

    async retrievePerson(id){
        const pgConn = await pgConnect();
        let dbRes;
        try{
            if(id === "undefined"){
                //dbRes = await db.many(`SELECT * from people order by person_id asc`);
                dbRes = await pgConn.query(`SELECT * from people order by person_id asc`);
            }else{
                //dbRes = await db.one(`SELECT * from people where person_id=${id}`);
                dbRes = await pgConn.query(`SELECT * from people where person_id=${id}`);
            }
            return dbRes.rows;
        }catch(e){
            return false;
        }
    }

    async updatePerson(data){
        let dataFormatted = "";
        const person = {
            person_id:data.id,
            person_name:data.name,
            person_lastname:data.lastname,
            email:data.email,
            phone:data.phone,
            country:data.country,
            city:data.city,
            address:data.address
        }

        for(const key in person){
            if(key !== 'person_id' && typeof person[key] !== 'undefined'){
                dataFormatted += `${key}='${person[key]}',`
            }
        }
        dataFormatted = dataFormatted.slice(0,-1);
        try{
            const pgConn = await pgConnect();
            const dbRes = await pgConn.query(`UPDATE people SET ${dataFormatted} where person_id=${person.person_id}`);
            return true;
        }catch(e){
            return false;
        }

    }

    async deletePerson(id){
        try{
            const pgConn = await pgConnect();
            const dbRes = await pgConn.query(`DELETE from people where person_id=${id}`);
            return true;
        }catch(e){
            return false
        }
    }
} 

module.exports = Database;