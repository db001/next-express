import React, { useState, useContext } from "react";
import axios from "axios";
import router, { useRouter } from "next/router";
import { isValidEmail } from "../helpers";

import { UserContext } from "../context/UserContext";

// import { isEmptyObject } from "../../../helpers";

const LoginPage = () => {
	const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
	const [errorMsg, setErrorMsg] = useState("");
	const { user, setUser } = useContext(UserContext);

	const onChangeHandler = (e) => {
		setErrorMsg("");
		const id = e.target.id;
		setLoginDetails({ ...loginDetails, [id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = loginDetails;

		if (!isValidEmail(email)) {
			setErrorMsg("Email address is not valid");
			return;
		}

		const res = await axios.post("/api/auth/login", { email, password });
		const data = res.data;

		if (data.error) {
			setErrorMsg(data.message);
			return;
		}

		setUser(data.user);
		router.push("/");
	};

	return (
		<>
			<h2>Please log in</h2>
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
			<br />
			Forgotten your password? <a href="/login/reset">Reset your password here</a>
		</>
	);
};

export default LoginPage;

/*
class LoginPage extends Component {
	static contextType = userContext;

	constructor(props) {
		super(props);

		this.state = {
			user: {},
			email: "",
			password: "",
			submitErrors: false,
			submitErrorMsg: "",
			emailValidationError: "",
			redirect: false,
		};
	}

	loginUser = async (creds) => {
		const res = await axios.post("/api/auth/login", creds);
		return res.data;
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { setUser } = this.context;
		const { email, password } = this.state;
		if (!isValidEmail(email)) {
			this.setState({
				emailValidationError: "Email address is not valid",
			});
			return;
		}

		const loggedInUser = await this.loginUser({ email, password });

		if (loggedInUser.user && !isEmptyObject(loggedInUser.user)) {
			setUser(loggedInUser.user);
			this.setState({
				redirect: true,
			});
		} else {
			this.setState({
				submitErrors: true,
				submitErrorMsg: loggedInUser.message,
			});
		}
	};

	componentDidMount() {
		this.setState({
			user: this.context.user,
		});
	}

	onChangeHandler = (e) => {
		this.setState({
			errors: false,
			emailValidationError: "",
		});
		const id = e.target.id;

		this.setState({
			[id]: e.target.value,
		});
	};

	render() {
		if (!isEmptyObject(this.state.user)) {
			return <Redirect to="/home" />;
		}
		if (this.state.redirect) {
			return <Redirect to="/home" />;
		}
		return (
			<>
				<h2>Please log in</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<div className="input-container">
							<label htmlFor="email">Email</label>
							<input type="email" id="email" onChange={this.onChangeHandler} value={this.state.email} />
							{this.state.emailValidationError && (
								<p className="message message__error">{this.state.emailValidationError}</p>
							)}
						</div>
					</div>
					<div className="form-group">
						<div className="input-container">
							<label htmlFor="password">Password</label>
							<input type="password" id="password" onChange={this.onChangeHandler} value={this.state.password} />
						</div>
					</div>
					<div>
						<button type="submit">Submit</button>
					</div>
				</form>
				<br />
				Forgotten your password? <a href="/login/reset">Reset your password here</a>
				{this.state.submitErrors && (
					<p className="message message__error">Either the email address or password is incorrect</p>
				)}
			</>
		);
	}
}

export default LoginPage;
*/
