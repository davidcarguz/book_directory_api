const express = require('express');
const personService = require('./../services/person.service');
const validatorHandler = require('./../middlewares/validator.middleware');
const { postPersonSchema, patchPersonSchema, idSchema } = require('../schemas/personSchema');

const router = express.Router();
const service = new personService();

router.get('/:id',validatorHandler(idSchema, 'params'), async (req, res)=>{
    const response = await service.findPerson(req.params.id);
    res.status(response.status_code).setHeader("Content-Type","application/json").json(response);
 });

router.get('/', async (req, res)=>{
    const response = await service.findPeople();
    res.status(response.status_code).setHeader("Content-Type","application/json").json(response);
 });

router.post('/',validatorHandler(postPersonSchema,'body'), async (req, res)=>{
    const response = await service.create(req.body);
    res.status(response.status_code).setHeader("Content-Type","application/json").json(response);

});

router.patch('/:id',validatorHandler(idSchema, 'params'), validatorHandler(patchPersonSchema, 'body'), async (req, res)=>{
    const response = await service.partialUpdate(req.params.id, req.body);
    res.status(response.status_code).setHeader("Content-Type","application/json").json(response);
});

router.delete('/:id', validatorHandler(idSchema,'params'), async (req, res)=>{
    const response = await service.delete(req.params);
    res.status(response.status_code).setHeader("Content-Type","application/json").json(response);
})

module.exports = router;