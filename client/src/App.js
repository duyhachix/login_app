import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from '../src/pages/Auth';
import Home from '../src/pages/Home';

import './App.css';

function App() {
	return (
		<Router>
			<div className="App d-flex justify-content-center"></div>
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
