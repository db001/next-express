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

const resendVerifyEmail = (email, verify_string, from) => {
	const verifyLink = `http://localhost:3000/verify/code/?${verify_string}`;

	const params = {
		Destination: {
			ToAddresses: [destinationEmail],
		},

		Message: {
			Subject: {
				Charset: "UTF-8",
				Data: "Optimisation Wiki - Verify your email",
			},
			Body: {
				Text: {
					Charset: "UTF-8",
					Data: `Hello ${email},\n\nYour email verification link is ${verifyLink} `,
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
                        <br />
                        Your <a href="${verifyLink}">email verification link</a></div>
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

module.exports = resendVerifyEmail;
