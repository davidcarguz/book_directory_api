const { Model, DataTypes } = require('sequelize');

const PEOPLE_TABLE = 'people';

const peopleSchema = {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'person_id'
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'person_name'
    },
    lastname: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'person_lastname'
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING
    },
    city: {
        allowNull: true,
        type: DataTypes.STRING
    }
};

class Person extends Model {

    static assosiate(){
        //relations with other tables.
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: PEOPLE_TABLE,
            modelName: 'Person',
            timestamps: false
        }
    }
}

module.exports = { PEOPLE_TABLE, peopleSchema, Person};