import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const VerifyUser = () => {
	const [userIsVerified, setUserIsVerified] = useState(false);
	const [verificationCode, setVerificationCode] = useState("");
	const [codeExists, setCodeExists] = useState(true);
	const router = useRouter();

	const getQueryString = () => {
		const execArr = /\?verifycode=(.+)$/gi.exec(router.asPath);
		return execArr && execArr.length > 1 ? execArr[1] : null;
	};

	const verifyUser = async () => {
		const verifyString = getQueryString();
		setVerificationCode(verifyString);
		if (!verifyString) {
			setCodeExists(false);
		}
		const response = await axios.get(`/user/verify/code/${verifyString}`);

		if (response.status === 200 && response.statusText === "OK") {
			if (response.data.verified) {
				setUserIsVerified(true);
			}
		}
	};

	useEffect(() => {
		verifyUser();
	}, []);

	return (
		<>
			<h1>Verify</h1>
			{codeExists && !userIsVerified && (
				<p>
					Sorry, there's been an issue with verifying your email.{" "}
					<Link href="/verify/resend">
						<a>Please click here to resend your verification email</a>
					</Link>
				</p>
			)}
			{userIsVerified && <p>Thanks for verifying</p>}
		</>
	);
};

export default VerifyUser;
