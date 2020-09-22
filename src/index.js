import express from "express";

// MIDDLEWARES
import morgan from 'morgan'; //logger for requests
import helmet from 'helmet';
import cors from 'cors';
import { connect } from 'mongoose';

require('dotenv').config()

import { notFound, errorHandler } from './middlewares';
import logs from './api/logs';


const app = express();

    connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    });


app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());


// / route returns a json message instead of cannot get /
app.get('/', (req,res) =>{
    res.json({
        message: 'Hello World!',
    });
});

//router for logs
app.use('/api/logs', logs)

app.use(notFound);
app.use(errorHandler);



const port = process.env.PORT || 1337;
app.listen(port, () => {
	console.log(`listening at https://localhost:${port}`);
});


