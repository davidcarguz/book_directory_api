const express = require('express');
const app = express();
const port = 3000;
const apiRouters = require('./routes');

app.use(express.json())

apiRouters(app);

app.listen(port, ()=>{
    console.log(`Book directory app running on port ${port}`)
});