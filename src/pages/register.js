import React, { useState, useContext } from "react";
import axios from "axios";
// import { Redirect } from "react-router";
import { isValidEmail } from "../helpers";

import { userContext } from "../context/userContext";

// import { userContext } from "../../../context/userContext";

// import { isEmptyObject } from "../../../helpers";

const RegisterPage = () => {
	const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
	const [errorMsg, setErrorMsg] = useState("");
	// const [user, setUser] = useState();
	const user = useContext(userContext);

	console.log(user);

	const onChangeHandler = (e) => {
		setErrorMsg("");
		const id = e.target.id;
		setLoginDetails({ ...loginDetails, [id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = loginDetails;

		try {
			const res = await axios.post("/api/auth/register", { email, password });
			const data = res.data;

			setUser(data.user);

			console.log(res);
		} catch (error) {
			setErrorMsg(`Sorry there has been a server error: "${error.message}".  Please try again later`);
		}
	};

	return (
		<>
			<h2>Please register</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<div className="input-container">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={onChangeHandler} />
					</div>
				</div>
				<div className="form-group">
					<div className="input-container">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={onChangeHandler} />
					</div>
				</div>
				<div>
					<button type="submit">Submit</button>
				</div>
				{errorMsg && <p className="message message__error">{errorMsg}</p>}
			</form>
		</>
	);
};

export default RegisterPage;
