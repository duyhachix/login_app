import React, { useState } from 'react';
// import libraries
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';

function Login() {
	// state
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
	}
	return (
		<div className="w-100 vh-100 p-1 bg-secondary d-flex justify-content-center align-items-center">
			<div className="w-50 p-4 bg-secondary-subtle rounded">
				<h2>
					<strong className="text-primary">Login into your account</strong>
				</h2>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3 text-start" controlId="formGroupEmail">
						<Form.Label className="fs-5">Email address</Form.Label>
						<Form.Control
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							type="email"
							placeholder="Enter email"
						/>
					</Form.Group>
					<Form.Group className="mb-3 text-start" controlId="formGroupPassword">
						<Form.Label className="fs-5">Password</Form.Label>
						<Form.Control
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							type="password"
							placeholder="Password"
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Login
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default Login;
