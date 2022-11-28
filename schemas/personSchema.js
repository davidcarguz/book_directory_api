const joi = require('joi');
const phonePattern = /^[0-9 +]+$/

    const id = joi.number().integer().positive()
    const name = joi.string().min(2).max(50)
    const lastname = joi.string().min(2).max(50)
    const email = joi.string().email()
    const phone = joi.string().min(7).max(20).pattern(phonePattern, 'phone number')
    const country = joi.string().min(2).max(50)
    const city = joi.string().min(2).max(50)
    const address = joi.string().min(2).max(50)

const postPersonSchema = joi.object({
    name: name.required(),
    lastname: lastname.required(),
    email: email.required(),
    phone: phone.required(),
    country: country.required(),
    city: city.required(),
    address: address.allow('')
});

const patchPersonSchema = joi.object({
    name: name.empty(""),
    lastname: lastname.empty(""),
    email: email.empty(""),
    phone: phone.empty(""),
    country: country.empty(""),
    city: city.empty(""),
    address: address.empty("")
});

const idSchema = joi.object({
    id: id.required()
});

async function validatePerson(request, schema){
    try{
        return await schema.validateAsync(request);

    }catch(error){
        return error;   
    }
}

function validateId(id){
    return idSchema.validate(id);
}

module.exports = { validatePerson, validateId, postPersonSchema, patchPersonSchema, idSchema };