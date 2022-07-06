import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addResume } from '../api';
import { resumeContext } from '../store/resumeContext';
const Home = () => {
	const navvigate = useNavigate();
	const { setResumeUsername, setError, setResume } = useContext(resumeContext);
	const [username, setUsername] = useState('');
	const submitHandler = async (e) => {
		e.preventDefault();
		if (username.includes(' ')) {
			window.alert('username cannnot contain space');
			return;
		}
		try {
			const response = await addResume(username);
			console.log(response);
			if (response.success) {
				setResumeUsername(response.data.username);
				setResume(response.data);
			} else {
				setError(response.message);
			}
			navvigate('/resume');
		} catch (err) {
			setError(err.message);
		}
	};
	return (
		<StyledHome>
			<form onSubmit={submitHandler}>
				<h1>Resume Generator</h1>
				<h3>Enter a username</h3>
				<input
					type="text"
					required
					name="username"
					placeholder="Enter usernname"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<small>Username cannot contain space.</small>
			</form>
		</StyledHome>
	);
};
export default Home;
const StyledHome = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background: #1c2024;
	form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
		h1 {
			color: #0070f3;
			font-size: 2rem;
			font-weight: 500;
		}
		h3 {
			color: white;
			font-size: 1.5rem;
			font-weight: 500;
		}
		input {
			background: #26303c;
			max-width: 500px;
			color: rgb(121, 184, 255);
			font-size: 1.25rem;
			font-weight: 400;
			text-align: center;
			border-radius: 0.25rem;
			width: 40rem;
			border: none;
			outline: none;
			padding: 0.75rem 1.5rem;
		}
		small {
			color: white;
		}
	}
`;
