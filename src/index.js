const express = require("express");
// import express from "express";

// MIDDLEWARES
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

// import morgan from 'morgan'; //logger for requests
// import helmet from 'helmet';
// import cors from 'cors';
// import { connect } from 'mongoose';

require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

// import { notFound, errorHandler } from './middlewares';
// import logs from './api/logs';

const app = express();

const url = "mongodb://mongodb://localhost:27017/travel-log";
console.log(url);

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	})
);
app.use(express.json());

// / route returns a json message instead of cannot get /
app.get("/", (req, res) => {
	res.json({
		message: "Hello World!",
	});
});

//router for logs
app.use("/api/logs", logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// app.use(notFound);
// app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`listening at https://localhost:${port}`);
});
