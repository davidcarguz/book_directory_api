const sequelize = require('./sequelize');

const { models } = require('./sequelize');

class Database {

    async addPerson (person){
        const dbRes = await models.Person.create(person);
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

    async updatePerson(id, data){
        try{
            const person = await models.Person.findByPk(id);
            await person.update(data);
            return true;
        }catch(e){
            return false;
        }

    }

    async deletePerson(id){
        try{
            const person = await models.Person.findByPk(id);
            await person.destroy();
            return true;
        }catch(e){
            return false
        }
    }
} 

module.exports = Database;