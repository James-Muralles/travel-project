import mongoose from "mongoose";
const { Schema } = mongoose;

const requiredNumber = {
    type: Number,
    required: true,
}

const LogEntrySchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	comments: String,
	image: String,
	rating: {
		type: tNumber,
		min: 0,
		max: 10,
		deafult: 0,
    },
    latitude: {requiredNumber, min: -90, max: 90},
    longitude: {requiredNumber,min: -180, max: 180},
    visitDate: {
        type: Date,
        required: true,
    }
},{
    timestamps: true,
})

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
