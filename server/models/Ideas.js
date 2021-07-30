const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	devices: [
		{
			label: {
				type: String,
			},
			value: {
				type: String,
			},
		},
	],
	deviceWeighting: {
		type: Number,
		default: 0,
	},
	idea: {
		type: String,
		required: true,
	},
	whereFrom: [
		{
			label: {
				type: String,
			},
			value: {
				type: String,
			},
			weighting: {
				type: Number,
			},
		},
	],
	whereFromWeighting: {
		type: Number,
	},
	hypothesis: {
		type: String,
		required: true,
	},
	goal: {
		type: String,
		required: true,
	},
	extraInfo: {
		type: String,
		required: false,
	},
	totalWeighting: {
		type: Number,
		default: 0,
	},
});

module.exports = Idea = mongoose.model("idea", IdeaSchema);
