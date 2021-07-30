const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const next = require("next");

const passport = require("./passport/setup");
const auth = require("./routes/auth");
const verify = require("./routes/verify");
const recover = require("./routes/recover");
const ideasRoutes = require("./routes/ideasRoutes");

require("dotenv").config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PWD;
const SECRET = process.env.SECRET;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const MONGO_URI = `mongodb+srv://${mongoUser}:${mongoPassword}@ideas.udkam.mongodb.net/nextexpress?retryWrites=true&w=majority`;

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(console.log(`MongoDB connected`))
	.catch((err) => console.log(`Mongo err: ${err}`));

(async () => {
	try {
		await app.prepare();

		const server = express();

		// Express sessions
		server.use(
			session({
				secret: SECRET,
				resave: false,
				saveUninitialized: true,
				store: MongoStore.create({
					mongoUrl: MONGO_URI,
					mongooseConnection: mongoose.connection,
					dbName: "nextexpress",
				}),
			})
		);

		server.use(express.json());
		server.use(express.urlencoded({ extended: false }));

		// Passport middleware
		server.use(passport.initialize());
		server.use(passport.session());

		// Routes
		server.use("/api/auth", auth);
		server.use("/api/auth/recover", recover);
		server.use("/user/verify", verify);
		server.use("/api/ideas", ideasRoutes);

		server.get("*", (req, res) => {
			return handle(req, res);
		});

		server.listen(port, (err) => {
			if (err) throw err;
			console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
})();
