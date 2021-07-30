const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");
const User = require("../models/Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { isValidEmail } = require("../helpers/index");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use(
	"register-user",
	new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
		if (!isValidEmail(email)) {
			return done(null, false, { invalidEmail: true, message: "invalid email" });
		}
		// Check if user exists
		User.findOne({ email: email })
			.then((user) => {
				if (user) {
					// If user exists then return
					return done(null, false, { userExists: true });
				} else {
					// Create new user
					let verify_string;

					randomBytes(32, (err, buf) => {
						if (err) throw err;
						verify_string = buf.toString("hex");
					});

					const newUser = new User({ email, password, verify_string });

					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							newUser.password = hash;
							newUser.verify_string = verify_string;
							newUser
								.save()
								.then((user) => {
									return done(null, user, { newUser: true });
								})
								.catch((err) => {
									return done(null, false, { message: err });
								});
						});
					});
				}
			})
			.catch((err) => {
				return done(null, false, { message: err });
			});
	})
);

passport.use(
	"login-user",
	new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
		if (!isValidEmail(email)) {
			return done(null, false, { invalidEmail: true, message: "invalid email" });
		}
		// Check if user exists
		User.findOne({ email: email })
			.then((user) => {
				if (user) {
					// If user exists, match password and return user
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;

						if (isMatch) {
							return done(null, user, { userExists: true });
						} else {
							return done(null, false, { message: "Incorrect password" });
						}
					});
				} else {
					return done(null, false, { userExists: false, message: "Email not known" });
				}
			})
			.catch((err) => {
				return done(null, false, { message: err });
			});
	})
);

module.exports = passport;
