import React from "react";
import Link from "next/link";

const IndexPage = () => {
	return (
		<>
			<div>Hi World Next - Express</div>
			<Link href="/login">Log in here</Link>
		</>
	);
};

export default IndexPage;
