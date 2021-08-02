import React, { useState, useContext } from "react";
import axios from "axios";
// import { isEmptyObject } from "../../helpers";
import { UserContext } from "../../context/UserContext";

const VerifyResend = () => {
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const onChangeHandler = (e) => {
		setEmail(e.target.value);
	};

	const requstVerifyEmail = async (creds) => {
		const res = await axios.post("/user/verify/resend", creds);
		return res;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await requstVerifyEmail({ email });

		if (response.status === 200 && response.statusText === "OK") {
			setSubmitted(true);
		}
	};

	return (
		<>
			<h2>Resend Verification Link</h2>
			<p>Your account has not been verified</p>
			<p>Please enter your email to send a verification link</p>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<div className="input-container">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={onChangeHandler} />
					</div>
				</div>

				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
			{submitted && <p>An email containing a verification link has been sent to {email} if it exists</p>}
		</>
	);
};

export default VerifyResend;
