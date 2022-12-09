const Database = require('../libs/database');

const database = new Database();

class PersonService{

    async create(person){
        let response = {};
        const dbRes = await database.addPerson(person);
        response.status_code = 201;
        response.message = "Successfully Saved.";
        response.person_id = dbRes.person_id;
        return response;
    }

    async findPerson(id){
    let response = {};
    const dbRes = await database.retrievePerson(id);
    if(!dbRes){
        response.status_code = 404;
        response.message = "The person does not exist or book directory is empty.";
    }else{
        response.status_code = 200;
        response.person = dbRes;
    }
    return response;
    }

    async findPeople(){
        let response = {};
        const dbRes = await database.retrievePerson('undefined');
        if(!dbRes){
            response.status_code = 404;
            response.message = "The book directory is empty.";
        }else{
            response.status_code = 200;
            response.people = dbRes;
        }
        return response;
    }

    async partialUpdate(id, data){
        let response = {};
            const dbRes = await database.updatePerson(id, data);
            if(dbRes){
                response.status_code = 200;
                response.message = `Record with id ${id} was successfully updated`;
            }else{ 
                response.status_code = 400;
                response.message = `There was an error updating the record`;
            }
        return response; 
    }

    async delete(data){
        let response = {};
        const dbRes = await database.deletePerson(data.id);
        if(dbRes){
            response.status_code = 200;
            response.message = `Record with id ${data.id} was successfully deleted`;
        }else{ 
            response.status_code = 400;
            response.message = `There was an error deleting the record`;
        }
        return response;
    }
}

module.exports = PersonService;