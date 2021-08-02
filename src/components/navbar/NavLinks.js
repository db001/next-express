export const loggedOutLinks = [
	{
		path: "/login",
		permissionLevel: "basic",
		text: "Login",
	},
	{
		path: "/register",
		permissionLevel: "basic",
		text: "Register",
	},
];

export const basicLinks = [
	{
		path: "/home",
		permissionLevel: "basic",
		text: "Home",
	},
	{
		path: "/wiki",
		permissionLevel: "basic",
		text: "Wiki",
	},
];

export const userLinks = [
	{
		path: "/ideas",
		permissionLevel: "user",
		text: "Ideas",
	},
];

export const devLinks = [
	{
		path: "/snippets",
		permissionLevel: "dev",
		text: "Code Snippets",
	},
	{
		path: "/codeeditor",
		permissionLevel: "dev",
		text: "Code Editor",
	},
];
