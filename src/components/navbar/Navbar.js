import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import axios from "axios";

import { UserContext } from "../../context/UserContext";

import { loggedOutLinks, basicLinks, userLinks, devLinks } from "./NavLinks";

import { isEmptyObject } from "../../helpers";

import styles from "./Navbar.module.css";

const Navbar = () => {
	const { user, setUser } = useContext(UserContext);

	const handleLogout = async () => {
		const logout = await axios.get("/api/auth/logout");
		if (logout.status === 200) {
			setUser({});
			router.push("/login");
		}
	};

	const renderContent = () => {
		const permissions = user.permissions;

		let navLinks;

		switch (permissions) {
			case "user":
				navLinks = [...basicLinks, ...userLinks];
				break;
			case "dev":
			case "admin":
				navLinks = [...basicLinks, ...userLinks, ...devLinks];
				break;
			default:
				navLinks = [...basicLinks, ...loggedOutLinks];
				break;
		}

		return navLinks.map((link) => {
			return createLink(link);
		});
	};

	const createLink = (linkDetails) => {
		const key = linkDetails.path.replace(/\//gi, "") + "Link";
		return (
			<li key={key}>
				<Link href={linkDetails.path}>
					<a>{linkDetails.text}</a>
				</Link>
			</li>
		);
	};

	return (
		<nav className={styles.navbar}>
			<p>
				<Link href="/home">
					<a href="/home">Optimisation Wiki</a>
				</Link>
			</p>
			{user && (
				<div style={{ marginRight: "auto", marginLeft: "1rem" }}>
					<span>User: {`${user.email || "none"}`}</span>
					<br />
					<span>Permission: {`${user.permissions || "none"}`}</span>
					<br />
					<span>Verified: {`${user.email_is_verified}`}</span>
				</div>
			)}
			<ul>
				{renderContent()}
				{!isEmptyObject(user) && user !== {} && (
					<li key="logoutLink">
						<button onClick={handleLogout}>Logout</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
