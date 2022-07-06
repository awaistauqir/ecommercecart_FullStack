import React from 'react';
import styled from 'styled-components';
const Navbar = () => {
	return (
		<StyledNavbar>
			<div>
				<input type="text" placeholder="Enter Username" />
			</div>
				<button>Search</button>
			
		</StyledNavbar>
	);
};

export default Navbar;
const StyledNavbar = styled.nav`
	width: 97%;
	background: #333;
	margin: 0 auto;
	height: fit-content;
	padding: 1rem 1.5rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1.5rem;
	div {
		height: fit-content;
		background: white;
		width: 20%;
		border-radius: 20px;
		border: white 1px solid;
		padding: 0.5rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		input {
			width: 100%; 
        /* height: 100%; */ 
			outline: none;
			border: none;
		}
	}
	button{
		background: #f3f3f3;
		padding: .25rem 1rem;
		border: none;
		outline: none;
		border-radius:10px;
	}
`;
