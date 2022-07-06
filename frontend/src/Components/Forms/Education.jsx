import React, { useContext, useState } from 'react';
import EducationItem from './EducationItem';
import styled from 'styled-components';
import { addEducation } from '../../api';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { Card, TextInput, UpdateButton } from '../../styles';
import { resumeContext } from '../../store/resumeContext';
const Education = ({ education }) => {
	const { increaseValue, resumeUsername } = useContext(resumeContext);
	const [openForm, setOpenForm] = useState(false);
	const [educationState, setEducationState] = useState({
		institution: '',
		educationType: '',
		grade: '',
		field: '',
		startDate: '',
		endDate: '',
		description: '',
		present: false,
	});
	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};
	const handleChange = (e) => {
		setEducationState({ ...educationState, [e.target.name]: e.target.value });
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		if (
			educationState.institution.length === 0 ||
			educationState.educationType.length === 0 ||
			educationState.field.length === 0 ||
			educationState.grade.length === 0 ||
			educationState.startDate.length === 0 ||
			educationState.description.length === 0
		) {
			window.alert('Please fill all the fileds');
			return;
		}
		try {
			const response = await addEducation(educationState, resumeUsername);

			increaseValue();
			setOpenForm(false);
			setEducationState({
				institution: '',
				educationType: '',
				grade: '',
				field: '',
				startDate: '',
				endDate: '',
				description: '',
				present: false,
			});
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<StyledEducation>
			<h2>Education History</h2>
			<Card>
				<Header>
					<h3>Education</h3>
					<Edit onClick={handleOpenForm}>
						{openForm ? <AiOutlineClose /> : <AiOutlinePlus />}
					</Edit>
				</Header>
				{openForm && (
					<Form onSubmit={submitHandler}>
						<FormControl>
							<label htmlFor="institution">Institution Name</label>
							<TextInput
								name="institution"
								value={educationState.institution}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="educationType">Education Type</label>
							<TextInput
								name="educationType"
								value={educationState.educationType}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="field">Field</label>
							<TextInput
								name="field"
								value={educationState.field}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="grade">Grade</label>
							<TextInput
								name="grade"
								value={educationState.grade}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="startDate">Start Date</label>
							<TextInput
								name="startDate"
								value={educationState.startDate}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="endtDate">End Date</label>
							<span>
								<label htmlFor="present">Still Studying?</label>
								<input
									type="checkbox"
									name="present"
									checked={educationState.present}
									value={educationState.present}
									onChange={() => {
										setEducationState({
											...educationState,
											present: !educationState.present,
										});
									}}
								/>
							</span>
							{!educationState.present && (
								<TextInput
									name="endDate"
									value={educationState.endDate}
									onChange={handleChange}
								/>
							)}
						</FormControl>
						<FormControl>
							<label htmlFor="description">Description</label>
							<TextInput
								name="description"
								value={educationState.description}
								onChange={handleChange}
							/>
						</FormControl>
						<UpdateButton type="submit">Add Education</UpdateButton>
					</Form>
				)}
				{!openForm && (
					<>
						{education.map((e) => (
							<EducationItem education={e} key={e.id} />
						))}
					</>
				)}
			</Card>
		</StyledEducation>
	);
};

const StyledEducation = styled.div``;
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
	span {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
`;

export default Education;
