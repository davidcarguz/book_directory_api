function validatorHandler(schema, property){
    return (req, res, next) =>{
        const data = req[property];
        const { error } = schema.validate(data);
        if(error){
            res.status(400).setHeader("Content-Type","application/json").json(error.message.replaceAll('"',''));
        }else{
            next();
        }
    }
}

module.exports = validatorHandler;