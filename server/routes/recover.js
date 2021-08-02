const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/Users");
const sesClient = require("../email/ses-client");

const { isValidEmail } = require("../helpers/index");

router.post("/", (req, res) => {
	const email = req.body.email;

	if (!isValidEmail(email)) {
		return res.status(200).json({ message: "invalid email" });
	}

	User.findOne({ email })
		.then((user) => {
			if (user) {
				user.generatePasswordReset();
				user.resetTokenUsed = false;
				user
					.save()
					.then(() => {
						sesClient.createPasswordReset(user.email, user.resetPasswordToken);
						res.status(200).json({ success: true });
					})
					.catch((err) => {
						res.status(500).json({ err });
					});
			} else {
				res.status(200).json({ success: true });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

router.post("/check", (req, res) => {
	const d = new Date();
	User.findOne({
		resetPasswordToken: req.body.resetToken,
		resetPasswordExpires: {
			$gte: d,
		},
		resetTokenUsed: false,
	})
		.then((user) => {
			if (user) {
				res.status(200).json({ validToken: true });
			} else {
				res.status(200).json({ validToken: false });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

router.post("/reset", (req, res) => {
	const d = new Date();
	User.findOne({
		resetPasswordToken: req.body.resetToken,
		resetPasswordExpires: {
			$gte: d,
		},
		resetTokenUsed: false,
	})
		.then((user) => {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
					if (err) throw err;
					user.password = hash;
					user.resetTokenUsed = true;
					user.resetPasswordToken = "";
					user
						.save()
						.then((youser) => {
							return res.status(200).json({
								user: {
									email: youser.email,
									email_is_verified: youser.email_is_verified,
									permissions: youser.permissions,
								},
							});
						})
						.catch((err) => {
							return res.status(500).json({ error: err });
						});
				});
			});
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

module.exports = router;
