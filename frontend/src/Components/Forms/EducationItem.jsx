import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { updateEducation, deleteEducation } from '../../api';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { TextInput, UpdateButton } from '../../styles';
import { resumeContext } from '../../store/resumeContext';
const EdcautionItem = ({ education }) => {
	const { increaseValue, resumeUsername } = useContext(resumeContext);
	const [openForm, setOpenForm] = useState(false);
	const [educationState, setEducationState] = useState(education);
	const handleOpenForm = () => {
		setOpenForm(!openForm);
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
			const response = await updateEducation(
				resumeUsername,
				education.id,
				educationState.institution,
				educationState.educationType,
				educationState.field,
				educationState.grade,
				educationState.startDate,
				educationState.endDate,
				educationState.present,
				educationState.description
			);

			increaseValue();
			setOpenForm(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = (e) => {
		setEducationState({ ...educationState, [e.target.name]: e.target.value });
	};
	const handleDelete = async () => {
		try {
			const response = await deleteEducation(resumeUsername, education.id);

			increaseValue();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<Options>
				<h3>Edcation</h3>
				<div>
					{openForm || (
						<Edit onClick={handleDelete}>
							<AiOutlineDelete />
						</Edit>
					)}
					<Edit onClick={handleOpenForm}>
						{openForm ? <AiOutlineClose /> : <BsPencil />}
					</Edit>
				</div>
			</Options>
			{openForm ? (
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
					<UpdateButton type="submit">Update Education</UpdateButton>
				</Form>
			) : (
				<Details>
					<p>
						<span>Instition Name: </span> {education.institution}
					</p>
					<p>
						<span>Education Type: </span> {education.educationType}
					</p>
					<p>
						<span>Field: </span> {education.field}
					</p>
					<p>
						<span>Grade: </span> {education.grade}
					</p>
					<p>
						<span>Start Date: </span> {education.startDate}
					</p>
					<p>
						<span>End Date: </span>
						{education.present ? 'Still Studying' : education.endDate}
					</p>
					<p>
						<span>Education Description: </span>
						{education.description}
					</p>
				</Details>
			)}
		</div>
	);
};

export default EdcautionItem;

const Edit = styled.button`
	padding: 0.5rem;
	border-radius: 9999px;
	outline: none;
	border: none;
	cursor: pointer;
	:hover {
		background-color: #eab308;
	}
`;
const Options = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	div {
		display: flex;
		align-items: center;
		gap: 1.5rem;
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
const Details = styled.div`
	span {
		font-weight: 600;
	}
`;
