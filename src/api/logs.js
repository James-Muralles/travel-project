const { Router } = require('express');
// import { Router } from "express";
const LogEntry = require('../models/LogEntry');
// import LogEntry from "../models/LogEntry";
const router = Router();



router.get("/", (req, res) => {
	res.json({
		message: "🌍",
	});
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

// export default router;
module.exports = router;
