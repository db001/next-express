import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const NewPassword = () => {
	const router = useRouter();

	const [resetToken, setResetToken] = useState("");
	const [validToken, setValidToken] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [checkingToken, setCheckingToken] = useState(true);
	const [passwordUpdated, setPasswordUpdated] = useState(false);

	const getQueryString = () => {
		const execArr = /\?resetcode=(.+)$/gi.exec(router.asPath);
		return execArr && execArr.length > 1 ? execArr[1] : null;
	};

	const checkResetToken = async (creds) => {
		const response = await axios.post("/api/auth/recover/check", creds);
		if (response.status === 200) {
			setCheckingToken(false);
		}
		if (response.data.validToken) {
			setValidToken(true);
		}
		return response;
	};

	const onChangeHandler = (e) => {
		setNewPassword(e.target.value);
	};

	const sendUpdatedPassword = async (creds) => {
		const response = await axios.post("/api/auth/recover/reset", creds);
		if (response.status === 200 && response.statusText === "OK") {
			setPasswordUpdated(true);
		}
		return response;
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		sendUpdatedPassword({ resetToken, newPassword });
	};

	const renderContent = () => {
		if (passwordUpdated) {
			return (
				<p>
					Your password has been updated.{" "}
					<Link href="/login">
						<a>Log in here</a>
					</Link>
				</p>
			);
		} else {
			if (validToken) {
				return (
					<>
						<h2>Enter new password</h2>
						<form onSubmit={onSubmitHandler}>
							<div className="form-group">
								<div className="input-container">
									<label>New Password</label>
									<input type="password" id="password" onChange={onChangeHandler} />
								</div>
							</div>
							<div>
								<button type="submit">Submit</button>
							</div>
						</form>
					</>
				);
			}
			if (resetToken) {
				if (checkingToken) {
					return <p>Checking reset token...</p>;
				}

				if (!checkingToken && !validToken) {
					return (
						<p>
							Sorry, this reset link has expired,{" "}
							<Link href="/login/reset">
								<a>request a new password reset link here</a>
							</Link>
						</p>
					);
				}
			}
		}

		return (
			<p>
				If you wish to reset your password please{" "}
				<Link href="/login/reset">
					<a>reset your password here</a>
				</Link>
			</p>
		);
	};

	useEffect(() => {
		const resetToken = getQueryString();
		console.log(resetToken);
		if (resetToken) {
			setResetToken(resetToken);
			checkResetToken({ resetToken });
		}
	}, []);

	return <>{renderContent()}</>;
};

export default NewPassword;

/*
export class NewPassword extends Component {
	constructor() {
		super();

		this.state = {
			resetToken: "",
			validToken: null,
			newPassword: "",
			checkingToken: true,
			passwordUpdated: false,
		};
	}

	getQueryString = () => {
		const qs = this.props.location.search.replace("?", "");
		return qs;
	};

	checkResetToken = async (creds) => {
		const response = await axios.post("/api/auth/recover/check", creds);
		if (response.status === 200) {
			this.setState({
				checkingToken: false,
			});
		}
		if (response.data.validToken) {
			this.setState({
				validToken: true,
			});
		}
		return response;
	};

	onChangeHandler = (e) => {
		this.setState({
			newPassword: e.target.value,
		});
	};

	sendUpdatedPassword = async (creds) => {
		const response = await axios.post("/api/auth/recover/reset", creds);
		if (response.status === 200 && response.statusText === "OK") {
			this.setState({
				passwordUpdated: true,
			});
		}
		return response;
	};

	onSubmitHandler = (e) => {
		e.preventDefault();
		const { resetToken, newPassword } = this.state;
		this.sendUpdatedPassword({ resetToken, newPassword });
	};

	renderContent = () => {
		const { passwordUpdated, resetToken, checkingToken, validToken } = this.state;

		if (passwordUpdated) {
			return (
				<p>
					Your password has been updated. <a href="/login">Log in here</a>
				</p>
			);
		} else {
			if (validToken) {
				return (
					<>
						<h2>Enter new password</h2>
						<form onSubmit={this.onSubmitHandler}>
							<div className="form-group">
								<div className="input-container">
									<label>New Password</label>
									<input type="password" id="password" onChange={this.onChangeHandler} />
								</div>
							</div>
							<div>
								<button type="submit">Submit</button>
							</div>
						</form>
					</>
				);
			}
			if (resetToken) {
				if (checkingToken) {
					return <p>Checking reset token...</p>;
				}

				if (!checkingToken && !validToken) {
					return (
						<p>
							Sorry, this reset link has expired, <a href="/login/reset">request a new password reset link here</a>
						</p>
					);
				}
			}
		}

		return (
			<p>
				If you wish to reset your password please <a href="/login/reset">reset your password here</a>
			</p>
		);
	};

	componentDidMount() {
		const resetToken = this.getQueryString();
		if (resetToken) {
			this.setState({
				resetToken,
			});
			this.checkResetToken({ resetToken });
		}
	}

	render() {
		return <>{this.renderContent()}</>;
	}
}

export default NewPassword;
*/
