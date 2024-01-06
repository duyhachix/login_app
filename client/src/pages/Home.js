import { React } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
	let { state } = useLocation();
	console.log('state', state);
	return (
		<div className="w-100 h-100 bg-black-subtle p-4">
			<h1 className="text-primary">Home page</h1>
			<p>Hi, {state.email}</p>
		</div>
	);
}
export default Home;
