import React, { useState } from 'react';
// import libraries
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

function Auth() {
	// state
	let [isLogin, setIsLogin] = useState(true);

	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [newEmail, setNewEmail] = useState('');
	let [newPassword, setNewPassword] = useState('');

	function toLoginForm() {
		setIsLogin(true);
	}
	function toSignupForm() {
		setIsLogin(false);
	}

	/**
	 * submit login form event handler
	 * @param {Event} e
	 */
	async function handleSubmit(e) {
		e.preventDefault();
		let loginInfo = {
			email: email,
			password: password,
		};
		console.log(loginInfo);
		try {
			let response = await axios.post(`http://localhost:3030/api/users/${email}`, loginInfo);
			if (response) {
				console.log(response);
			}
		} catch (error) {
			// Xử lý lỗi từ API
			console.error(`You may encounter ${error}`);
		}
	}

	/**
	 * submit sign up form event handler
	 * @param {Event} e
	 */
	async function handleSignUp(e) {
		e.preventDefault();
		let signUpInfo = {
			email: newEmail,
			password: newPassword,
		};

		try {
			let response = await axios.post(`http://localhost:3030/api/users/create-user`, signUpInfo);
			if (response.status === 201) {
				toast.success('New account created', {
					position: 'top-right',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'colored',
					onChange: () => {},
				});
				setNewEmail('');
				setNewPassword('');
				setIsLogin(true);
			}
		} catch (error) {
			// Xử lý lỗi từ API
			toast.error(`You may encounter ${error}`, {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		}
	}

	return (
		<div className="w-100 vh-100 p-1 bg-secondary d-flex justify-content-center align-items-center">
			<div className="container bg-white rounded w-50 d-flex flex-column align-items-center">
				<div className="w-75 d-flex justify-content-between align-items-center mt-3">
					<h3
						style={{
							cursor: 'pointer',
							color: isLogin ? 'blue' : '',
							borderBottom: isLogin ? '3px solid blue' : '',
						}}
						onClick={() => {
							toLoginForm();
						}}
					>
						Login
					</h3>
					<h3
						style={{
							cursor: 'pointer',
							color: !isLogin ? 'blue' : '',
							borderBottom: !isLogin ? '3px solid blue' : '',
						}}
						onClick={() => {
							toSignupForm();
						}}
					>
						Sign up
					</h3>
				</div>
				{isLogin ? (
					// login form
					<div className="login-form w-100 p-4">
						<h2>
							<strong className="text-primary">Login into your account</strong>
						</h2>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3 text-start" controlId="formGroupEmail">
								<Form.Label className="fs-5">Email address</Form.Label>
								<Form.Control
									value={email}
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
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
									type="password"
									placeholder="Enter password"
								/>
							</Form.Group>
							<Button variant="primary" type="submit" disabled={!email || !password}>
								Login
							</Button>
						</Form>
					</div>
				) : (
					// Sign up form
					<div className="signup-form w-100 p-4">
						<h2>
							<strong className="text-warning">Create a new account</strong>
						</h2>
						<Form onSubmit={handleSignUp}>
							<Form.Group className="mb-3 text-start" controlId="formGroupNewEmail">
								<Form.Label className="fs-5">Email address</Form.Label>
								<Form.Control
									value={newEmail}
									onChange={(e) => {
										setNewEmail(e.target.value);
									}}
									type="email"
									placeholder="Enter new email"
								/>
							</Form.Group>
							<Form.Group className="mb-3 text-start" controlId="formGroupNewPassword">
								<Form.Label className="fs-5">Password</Form.Label>
								<Form.Control
									value={newPassword}
									onChange={(e) => {
										setNewPassword(e.target.value);
									}}
									type="password"
									placeholder="Enter new password"
								/>
							</Form.Group>
							<Button variant="warning" type="submit" disabled={!newEmail || !newPassword}>
								Sign up
							</Button>
						</Form>
					</div>
				)}
			</div>
			<ToastContainer />
		</div>
	);
}

export default Auth;
