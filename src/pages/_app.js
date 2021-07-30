import React, { useContext, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { userContext } from "../context/userContext";
import "./styles.css";

const MyApp = ({ Component, pageProps }) => {
	// const { user, setUser } = useContext(userContext);
	// const [ userState, setUserState] = userState()

	// const getUser = async () => {
	// 	const user = await axios.get("/api/auth/current_user");
	// 	if (!isEmptyObject(user.data.user) && user.data.user !== undefined) {
	// 		this.setState({
	// 			user: user.data.user,
	// 		});
	// 		this.context.setUser(user.data.user);
	// 	}
	// }

	// const setUserMethod = (user) => {
	// 	setUserState(user)
	// }

	const user = { email: "dave@tui.com" };

	return (
		<userContext.Provider value={user}>
			<div id="page">
				<Head>
					<title>Opti Wiki</title>
					<link rel="icon" href="../public/favicon.ico" />
				</Head>
				<Component {...pageProps} />
			</div>
		</userContext.Provider>
	);
};

export default MyApp;
