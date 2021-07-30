const express = require("express");
const router = express.Router();

const Idea = require("../models/Ideas");

router.get("/", (req, res) => {
	res.status(200).json({ success: true });
});

router.post("/new", (req, res) => {
	const doc = new Idea(req.body);

	doc
		.save()
		.then((savedDoc) => {
			res.status(200).json(savedDoc);
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json({ error });
		});
});

router.get("/list", (req, res) => {
	Idea.find()
		.then((results) => {
			res.status(200).json(results);
		})
		.catch((error) => {
			res.status(400).json({ error });
		});
});

router.delete("/delete/:id", (req, res) => {
	const permissions = req.user.permissions;

	if (permissions !== "admin") {
		return res.status(401).json({ message: "Permission denied" });
	}

	Idea.deleteOne({ _id: req.params.id })
		.then((response) => {
			res.status(200).json({ message: response });
		})
		.catch((error) => {
			res.status(400).json({ error, message: "Permission denied" });
		});
});

module.exports = router;
