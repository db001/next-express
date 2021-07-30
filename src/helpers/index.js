import isEmail from "validator/lib/isEmail";

export const isEmptyObject = (obj) => {
	return obj === {} || (obj && Object.keys(obj).length === 0 && obj.constructor === Object) ? true : false;
};

export const isValidEmail = (email) => {
	const regex = new RegExp("@(tui.(com$|co.uk$|[a-z]{2}$))|(tuifly.com)", "gi");
	return isEmail(email) && regex.test(email);
};
