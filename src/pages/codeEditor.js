import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import router from "next/router";

const CodeEditor = () => {
	const { user, setUser } = useContext(UserContext);
	if (!user || user.permissions == "user") {
		router.push("/home");
	}

	return (
		<>
			<div>CodeEditor</div>
		</>
	);
};

export default CodeEditor;
