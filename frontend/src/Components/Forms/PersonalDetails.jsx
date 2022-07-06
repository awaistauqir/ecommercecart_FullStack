import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Card, TextInput, UpdateButton } from '../../styles';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { addPersonalDetails } from '../../api';
import { resumeContext } from '../../store/resumeContext';
const PersonalDetails = ({ personalDetails }) => {
	const { increaseValue, resumeUsername } = useContext(resumeContext);
	const [openForm, setOpenForm] = useState(false);
	const [personalDetail, setPersonalDetail] = useState(personalDetails);
	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};
	const handleChange = (e) => {
		setPersonalDetail({ ...personalDetail, [e.target.name]: e.target.value });
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		if (
			personalDetail.linkedin.length === 0 ||
			personalDetail.github.length === 0 ||
			personalDetail.portfolio.length === 0 ||
			!personalDetail
		) {
			window.alert('Fields cannot be empty');
			return;
		}
		try {
			const response = await addPersonalDetails(personalDetail, resumeUsername);
			increaseValue();
			setOpenForm(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<StyledPersonalDetails>
			<h2>Personal Details</h2>
			<Card>
				<Header>
					<h3>Links</h3>
					<Edit onClick={handleOpenForm}>
						{openForm ? <AiOutlineClose /> : <BsPencil />}
					</Edit>
				</Header>
				{openForm ? (
					<Form onSubmit={submitHandler}>
						<FormControl>
							<label htmlFor="linkedin">LinkedIn URL</label>
							<TextInput
								name="linkedin"
								value={personalDetail ? personalDetail.linkedin : ''}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="githhub">Github URL</label>
							<TextInput
								name="github"
								value={personalDetail ? personalDetail.github : ''}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="portfolio">Portfolio URL</label>
							<TextInput
								name="portfolio"
								onChange={handleChange}
								value={personalDetail ? personalDetail.portfolio : ''}
							/>
						</FormControl>
						<UpdateButton type="submit">Update</UpdateButton>
					</Form>
				) : (
					<Details>
						<h2>Links</h2>
						<p>
							<span>LinkedIn: </span>{' '}
							{personalDetails ? personalDetails.linkedin : ''}
						</p>
						<p>
							<span>Github: </span>{' '}
							{personalDetails ? personalDetails.github : ''}
						</p>
						<p>
							<span>Portfolio Link: </span>{' '}
							{personalDetails ? personalDetails.portfolio : ''}
						</p>
					</Details>
				)}
			</Card>
		</StyledPersonalDetails>
	);
};

export default PersonalDetails;
const StyledPersonalDetails = styled.div`
	h2 {
		margin-bottom: 1rem;
	}
`;
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	padding: 0.25rem 0;
	padding-bottom: 1rem;
	border-bottom: 1px solid lightgray;
`;
const Edit = styled.span`
	padding: 0.5rem;
	border-radius: 9999px;
	cursor: pointer;
	:hover {
		background-color: #eab308;
	}
`;
const Details = styled.div`
	span {
		font-weight: 600;
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
