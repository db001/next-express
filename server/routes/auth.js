const express = require("express");
const router = express.Router();
const passport = require("passport");

const sesClient = require("../email/ses-client");

router.get("/", (req, res) => {
	res.status(200).send("hello");
});

router.post("/login", (req, res, next) => {
	passport.authenticate("login-user", function (err, user, info) {
		if (err) {
			return res.status(400).json({ errors: err });
		} else if (!user) {
			return res.status(200).json({ error: true, message: info.message });
		} else if (info.newUser) {
			return res.status(200).json({ error: true, newUser: true, message: "New User" });
		} else {
			req.logIn(user, function (err) {
				if (err) {
					return res.status(400).json({ errors: err });
				}
				return res.status(200).json({
					user: {
						email: user.email,
						email_is_verified: user.email_is_verified,
						permissions: user.permissions,
					},
				});
			});
		}
	})(req, res, next);
});

router.post("/register", (req, res, next) => {
	passport.authenticate("register-user", function (err, user, info) {
		if (err) {
			return res.json({ errors: err });
		}

		if (info.invalidEmail) {
			return res.status(200).json({ error: "Invalid email, must be a valid TUI Group email" });
		}

		if (info.userExists) {
			return res.status(200).json({ error: "User already exists, please sign in" });
		}

		if (info.newUser) {
			sesClient.createVerifyEmail(user.email, user.verify_string);

			return res.status(200).json({
				user: {
					email: user.email,
					email_is_verified: user.email_is_verified,
					permissions: user.permissions,
				},
				newUser: true,
			});
		}
	})(req, res, next);
});

router.get("/current_user", (req, res) => {
	res.send({ user: req.user });
});

router.get("/logout", (req, res) => {
	req.logout();
	res.status(200).json({ message: "Logged out", user: req.user });
});

module.exports = router;
