const error404 = () => (
	<>
		<h2>Page not found</h2>
		<p>You may be trying to access a page that you don't have permission for, or not logged in</p>
		<a href="/home">Click here to return to the homepage</a> or <a href="/login">log in here</a>
	</>
);

export default error404;
