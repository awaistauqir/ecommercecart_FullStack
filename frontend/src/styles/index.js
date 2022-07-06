import styled from 'styled-components';

const Card = styled.div`
	background: #fff;
	padding: 1rem;
	border-radius: 16px;
`;
const TextInput = styled.input.attrs({ type: 'text' })`
	padding: 0.5rem 1rem;
	border-radius: 0.375rem;
	outline: none;
	border: lightgray 1px solid;
	width: 100%;
	font-size: 1.25rem;
	font-weight: 300;
	:focus {
		outline: 1px solid #6366f1;
	}
`;

const UpdateButton = styled.button`
	background-color: #facc15;
	outline: none;
	border: none;
	font-weight: 600;
	cursor: pointer;
	padding: 0.5rem 1.5rem;
	border-radius: 2rem;
	:hover {
		background-color: #eab308;
	}
	:disabled {
		cursor: not-allowed;
	}
`;
export { Card, TextInput, UpdateButton };
