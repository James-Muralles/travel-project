const { Router } = require("express");
// import { Router } from "express";
const LogEntry = require("../models/LogEntry");
// import LogEntry from "../models/LogEntry";
const router = Router();

// router.get("/", (req, res) => {
// 	res.json({
// 		message: "🌍",
// 	});
// });

router.get("/", async (req, res, next) => {
	try {
		const entries = await LogEntry.find();
		res.json(entries);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const logEntry = new LogEntry(req.body);
		const createdEntry = await logEntry.save();
		console.log(createdEntry);
		res.json(createdEntry);
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(422);
		}
		next(error);
	}
});

router.put("/update/:id", async (req, res) => {
	let id = req.params.id;
	try {
		LogEntry.findById(id).then((logEntry) => {
			console.log(logEntry);
			if (!logEntry) {
				res.status(404).send("data not found");
			} else {
                logEntry.title       = req.body.title;
                logEntry.comments    = req.body.comments;
                logEntry.description = req.body.description;
                logEntry.visitDate   = req.body.visitDate;
                logEntry.latitude    = req.body.latitude;
                logEntry.longitude   = req.body.longitude;
                logEntry.rating      = req.body.rating;
                logEntry.image       = req.body.image;
                logEntry.save();
                res.json(logEntry)
                console.log(logEntry)
			}
		});
	} catch (error) {
        res.status(400)
    }
});

export default router;
module.exports = router;
