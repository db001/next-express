const mongoose = require("mongoose");
const { randomBytes } = require("crypto");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	email_is_verified: {
		type: Boolean,
		default: false,
	},
	password: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	permissions: {
		type: String,
		default: "user",
	},
	verify_string: {
		type: String,
	},
	resetPasswordToken: {
		type: String,
	},
	resetPasswordExpires: {
		type: Date,
	},
	resetTokenUsed: {
		type: Boolean,
		default: false,
	},
});

UserSchema.methods.generatePasswordReset = function () {
	this.resetPasswordToken = randomBytes(20).toString("hex");
	this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = User = mongoose.model("user", UserSchema);
