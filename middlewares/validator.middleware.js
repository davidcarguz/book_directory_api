function validatorHandler(schema, property){
    return (req, res, next) =>{
        const data = req[property];
        const { error } = schema.validate(data);
        if(error){
            let response = {};
            response.statud_code = 400;
            response.error = error.message.replaceAll('"','');
            res.status(400).setHeader("Content-Type","application/json").json(response);
        }else{
            next();
        }
    }
}

module.exports = validatorHandler;