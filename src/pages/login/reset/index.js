import React, { useState } from "react";
import axios from "axios";

const PasswordReset = () => {
	const [email, setEmail] = useState();
	const [submitConfirmed, setSubmitConfirmed] = useState(false);

	const onChangeHandler = (e) => {
		const id = e.target.id;
		setEmail(e.target.value);
	};

	const requestPasswordReset = async (creds) => {
		const res = await axios.post("/api/auth/recover", creds);
		return res;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await requestPasswordReset({ email });

		if (response.status === 200 && response.statusText === "OK") {
			setSubmitConfirmed(true);
		}
	};

	return (
		<>
			<h2>Password Reset</h2>
			<p>Please enter your email</p>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<div className="input-container">
						<label>Email</label>
						<input type="email" id="email" onChange={onChangeHandler} />
					</div>
				</div>
				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
			{submitConfirmed && <p>An email containing a password reset link has been sent to {email} if it exists</p>}
		</>
	);
};

export default PasswordReset;
