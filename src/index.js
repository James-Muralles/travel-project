const express = require("express");

// MIDDLEWARES
const morgan = require('morgan'); //logger for requests
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const middlewares = require('./middlewares');

mongoose.connect(process.env.DATABASE_URL,{
useNewUrlParser:true,
});

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));


// / route returns a json message instead of cannot get /
app.get('/', (req,res) =>{
    res.json({
        message: 'Hello World!',
    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);



const port = process.env.PORT || 1337;
app.listen(port, () => {
	console.log(`listening at https://localhost:${port}`);
});


