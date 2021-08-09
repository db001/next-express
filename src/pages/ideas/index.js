import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import { isEmptyObject } from "../../helpers";

const Ideas = () => {
	const { user } = useContext(UserContext);
	const router = useRouter();

	useEffect(() => {
		if (!user || isEmptyObject(user) || user.permissions == "user") {
			router.push("/home");
		}
	}, [user]);

	return (
		<>
			<h2>Ideas form</h2>
			<Link href="/ideas/submit">
				<a>Submit an idea</a>
			</Link>
			<br />
			<Link href="/ideas/view">
				<a>View submitted ideas</a>
			</Link>
		</>
	);
};

export default Ideas;
