import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import { UserContext } from "../context/UserContext";
import { isEmptyObject } from "../helpers";
import "./styles.css";

const MyApp = ({ Component, pageProps }) => {
	const [user, setUser] = useState({});
	const value = { user, setUser };

	const getUser = async () => {
		const user = await axios.get("/api/auth/current_user");
		if (!isEmptyObject(user.data.user) && user.data.user !== undefined) {
			setUser(user.data.user);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<UserContext.Provider value={value}>
			<Navbar />
			<div id="page">
				<Head>
					<title>Opti Wiki</title>
					<link rel="icon" href="../public/favicon.ico" />
				</Head>
				<Component {...pageProps} />
			</div>
		</UserContext.Provider>
	);
};

export default MyApp;
