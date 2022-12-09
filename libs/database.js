const sequelize = require('./sequelize');

const { models } = require('./sequelize');

class Database {

    async addPerson (person){
        const dbRes = await models.Person.create(person);
        //const dbRes = await sequelize.query(`INSERT INTO people(person_name, person_lastname, email, phone, country, city, address) 
        //VALUES('${person.name}','${person.lastname}','${person.email}','${person.phone}','${person.country}','${person.city}','${person.address}') RETURNING person_id`);
        return dbRes;
    }

    async retrievePerson(id){
        let dbRes;
        try{
            if(id === "undefined"){
                dbRes = await models.Person.findAll({order: [['id', 'ASC']]});
            }else{
                dbRes = await models.Person.findByPk(id);
            }
            return dbRes;
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
            const dbRes = await sequelize.query(`UPDATE people SET ${dataFormatted} where person_id=${person.person_id}`);
            return true;
        }catch(e){
            return false;
        }

    }

    async deletePerson(id){
        try{
            const dbRes = await sequelize.query(`DELETE from people where person_id=${id}`);
            return true;
        }catch(e){
            return false
        }
    }
} 

module.exports = Database;