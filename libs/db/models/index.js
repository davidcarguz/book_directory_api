const { Person, peopleSchema } = require('./person.model');

function setupModels(sequelize){
    Person.init(peopleSchema, Person.config(sequelize));
}

module.exports = setupModels;