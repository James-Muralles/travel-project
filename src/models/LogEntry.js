import mongoose from "mongoose";
import { Schema } from "mongoose";

const requiredNumber = {
	type: Number,
	required: true,
};

const LogEntrySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: String,
		comments: String,
		image: String,
		rating: {
			type: Number,
			min: 0,
			max: 10,
			deafult: 0,
		},
		latitude: {
			type: Number,
			required: true,
			min: -90,
			max: 90,
		},
		longitude: {
			
			type: Number,
			required: true,
			min: -180,
			max: 180,
		},
		visitDate: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const LogEntry = mongoose.model("LogEntry", LogEntrySchema);

export default LogEntry;
