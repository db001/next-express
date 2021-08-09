import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import { isEmptyObject } from "../helpers";

const CodeEditor = () => {
	const { user } = useContext(UserContext);
	const router = useRouter();

	useEffect(() => {
		if (!user || isEmptyObject(user) || user.permissions == "user") {
			router.push("/home");
		}
	}, [user]);

	return (
		<>
			<div>CodeEditor</div>
		</>
	);
};

export default CodeEditor;
