const AWS = require("aws-sdk");

const config = require("../../config");

require("dotenv").config();

AWS.config.update({
	accessKeyId: config.aws.key,
	secretAccessKey: config.aws.secret,
	region: config.aws.ses.region,
});

const destinationEmail = process.env.DESTINATIONEMAIL;

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const createPasswordReset = (email, resetString, from) => {
	const resetLink = `http://localhost:3000/login/reset/code?resetcode=${resetString}`;

	const params = {
		Destination: {
			ToAddresses: [destinationEmail],
		},

		Message: {
			Subject: {
				Charset: "UTF-8",
				Data: "Optimisation Wiki - Password Reset",
			},
			Body: {
				Text: {
					Charset: "UTF-8",
					Data: `Hello ${email},\n\nA password reset was requested for your email.  Please visit ${resetLink} to reset your password`,
				},
				Html: {
					Charset: "UTF-8",
					Data: `<html>
                <head>
                    <title>Verify your email</title>
                        <style>h1{color:#f00;}</style>
                    </head>
                    <body>
                        <h1>Hello ${email},</h1>
                        <div>A password reset was requested for your email.
                        <br />
                        Please <a href="${resetLink}">visit this link to reset your password</a></div>
                        <p>Thanks,</p>
                        <p>The Optimisation Team</p>
                    </body>
                </html>`,
				},
			},
		},
		ReturnPath: from ? from : config.aws.ses.from.default,
		Source: from ? from : config.aws.ses.from.default,
	};

	ses.sendEmail(params, (err, data) => {
		if (err) {
			return console.log(err, err.stack);
		} else {
			console.log("Email sent.", data);
		}
	});
};

module.exports = createPasswordReset;
