const personRouter = require('./person.router');

function apiRouters(app){
    app.use('/api/person', personRouter);
}

module.exports =  apiRouters ;