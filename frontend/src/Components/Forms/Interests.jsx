import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { resumeContext } from '../../store/resumeContext';
import { Card, TextInput, UpdateButton } from '../../styles';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { addInterest, deleteInterest } from '../../api';
const Interests = ({ interests }) => {
	const { increaseValue, resumeUsername } = useContext(resumeContext);
	const [openForm, setOpenForm] = useState(false);
	const [interestValue, setInterestValue] = useState('');
	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};
	const handleChange = (e) => {
		setInterestValue(e.target.value);
	};
	const handleDelete = async (id) => {
		try {
			const response = await deleteInterest(id, resumeUsername);
			increaseValue();
			setOpenForm(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleAdd = async (e) => {
		e.preventDefault();
		if (interestValue.length === 0) {
			window.alert('Please enter an interest.');
			return;
		}
		try {
			const response = await addInterest(interestValue, resumeUsername);
			increaseValue();
			setOpenForm(false);
			setInterestValue('');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<StyledInterest>
			<h2>Interests</h2>
			<Card>
				<Header>
					<h3>Interests</h3>
					<Edit onClick={handleOpenForm}>
						{openForm ? <AiOutlineClose /> : <BsPencil />}
					</Edit>
				</Header>
				<InterestsList>
					{interests.map((item) => (
						<li key={item.id} id={item.id}>
							<span>{item.interest}</span>
							<span>
								<UpdateButton onClick={() => handleDelete(item.id)}>
									<AiOutlineDelete />
								</UpdateButton>
							</span>
						</li>
					))}
				</InterestsList>
				{openForm && (
					<Form onSubmit={handleAdd}>
						<FormControl>
							<label htmlFor="interest">Enter Interest</label>
							<TextInput
								name="interest"
								value={interestValue}
								onChange={handleChange}
							/>
						</FormControl>
						<UpdateButton type="submit">Add</UpdateButton>
					</Form>
				)}
			</Card>
		</StyledInterest>
	);
};

export default Interests;
const StyledInterest = styled.div``;
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	padding: 0.25rem 0;
	padding-bottom: 1rem;
	border-bottom: 1px solid lightgray;
`;
const InterestsList = styled.ul`
	width: 100%;
	border-bottom: 1px solid lightgray;
	padding-bottom: 1rem;
	margin-bottom: 1rem;

	> li {
		list-style: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}
`;
const Edit = styled.span`
	padding: 0.5rem;
	border-radius: 9999px;
	cursor: pointer;
	:hover {
		background-color: #eab308;
	}
`;
const Form = styled.form`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 0.75rem;
`;
const FormControl = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;
