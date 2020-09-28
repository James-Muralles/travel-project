// import mongoose from "mongoose";
const mongoose = require('mongoose');
// import { Schema } from "mongoose";÷
const {Schema} = mongoose;

const requiredNumber = {
	type: Number,
	required: [true, 'a number is required'],
};

const logEntrySchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'a title is required'],
		},
		description: String,
		comments: String,
		image: String,
		rating: {
			type: Number,
			min: 0,
			max: 10,
			default: 0,
		},
		latitude: {
			...requiredNumber,
			min: -90,
			max: 90,
		},
		longitude: {
			...requiredNumber,
			min: -180,
			max: 180,
		},
		visitDate: {
			required: [true, 'a date is required'],
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const LogEntry = mongoose.model("LogEntry", logEntrySchema);

// export default LogEntry;
module.exports = LogEntry;
