import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import libraries
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Auth() {
	// state
	const navigate = useNavigate();
	let [isLogin, setIsLogin] = useState(true);

	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [newEmail, setNewEmail] = useState('');
	let [newPassword, setNewPassword] = useState('');

	let [showPassword, setShowPassword] = useState(false);
	let [showPasswordSignup, setShowPasswordSignup] = useState(false);

	function togglePasswordLogin() {
		setShowPassword((prev) => !prev);
	}
	function togglePasswordSignup() {
		setShowPasswordSignup((prev) => !prev);
	}

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
	async function handleLogin(e) {
		e.preventDefault();
		let loginInfo = {
			email: email,
			password: password,
		};
		try {
			let response = await axios.post('http://localhost:3030/api/users/login', loginInfo);
			if (response.status === 201) {
				const { password, email } = response.data; // Replace with your actual response structure
				toast.success('Login successfully', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'colored',
				});
				navigate('/home', { state: { password, email } });
			}
		} catch (error) {
			// Xử lý lỗi từ API
			toast.error(`${error.message}`, {
				position: 'top-right',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
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
					<div className="login-form w-100 p-4 text-center">
						<h2>
							<strong className="text-primary">Login into your account</strong>
						</h2>
						<Form onSubmit={handleLogin}>
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
								<div className="d-flex gap-2">
									<Form.Control
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										type={!showPassword ? 'password' : 'text'}
										placeholder="Enter password"
									/>
									<InputGroup.Text style={{ cursor: 'pointer' }} onClick={togglePasswordLogin}>
										{showPassword ? <EyeSlashFill /> : <Eye />}
									</InputGroup.Text>
								</div>
							</Form.Group>
							<Button variant="primary" type="submit" disabled={!email || !password}>
								Login
							</Button>
						</Form>
					</div>
				) : (
					// Sign up form
					<div className="signup-form w-100 p-4 text-center">
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
								<div className="d-flex gap-2">
									<Form.Control
										value={newPassword}
										onChange={(e) => {
											setNewPassword(e.target.value);
										}}
										type={!showPasswordSignup ? 'password' : 'text'}
										placeholder="Enter new password"
									/>
									<InputGroup.Text style={{ cursor: 'pointer' }} onClick={togglePasswordSignup}>
										{showPasswordSignup ? <EyeSlashFill /> : <Eye />}
									</InputGroup.Text>
								</div>
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
