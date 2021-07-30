const isEmail = require("validator/lib/isEmail");

const isEmptyObject = (obj) => {
	return obj === {} || (obj && Object.keys(obj).length === 0 && obj.constructor === Object) ? true : false;
};

const isValidEmail = (email) => {
	const regex = new RegExp("@(tui.(com$|co.uk$|[a-z]{2}$))|(tuifly.com)", "gi");
	return isEmail(email) && regex.test(email);
};

module.exports = { isValidEmail };
