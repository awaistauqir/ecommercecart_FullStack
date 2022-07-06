import React, { useContext, useState } from 'react';
import { resumeContext } from '../../store/resumeContext';
import styled from 'styled-components';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { TextInput, UpdateButton } from '../../styles';
import { deleteWork, updateWork } from '../../api';
const WorkItem = ({ work }) => {
	const { increaseValue, resumeUsername } = useContext(resumeContext);
	const [openForm, setOpenForm] = useState(false);
	const [workState, setWorkState] = useState(work);
	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		if (
			workState.company.length === 0 ||
			workState.roleTitle.length === 0 ||
			workState.startDate.length === 0 ||
			workState.description.length === 0
		) {
			window.alert('Please fill all the fileds');
			return;
		}
		try {
			const response = await updateWork(
				resumeUsername,
				work.id,
				workState.company,
				workState.roleTitle,
				workState.startDate,
				workState.endDate,
				workState.present,
				workState.description
			);
			console.log(response);
			increaseValue();
			setOpenForm(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = (e) => {
		setWorkState({ ...workState, [e.target.name]: e.target.value });
	};
	const handleDelete = async () => {
		try {
			const response = await deleteWork(resumeUsername, work.id);
			increaseValue();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<StyledWorkItem>
			<Options>
				<h3>Work</h3>
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
						<label htmlFor="company">Company Name</label>
						<TextInput
							name="company"
							value={workState.company}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<label htmlFor="roleTitle">Role Title</label>
						<TextInput
							name="roleTitle"
							value={workState.roleTitle}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<label htmlFor="startDate">Start Date</label>

						<TextInput
							name="startDate"
							value={workState.startDate}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<label htmlFor="endtDate">End Date</label>
						<span>
							<label htmlFor="present">Still Working?</label>
							<input
								type="checkbox"
								name="present"
								checked={workState.present}
								value={workState.present}
								onChange={() => {
									setWorkState({ ...workState, present: !workState.present });
									console.log(workState);
								}}
							/>
						</span>
						{!workState.present && (
							<>
								<label htmlFor="endtDate">End Date</label>
								<TextInput
									name="endDate"
									value={workState.endDate}
									onChange={handleChange}
								/>
							</>
						)}
					</FormControl>
					<FormControl>
						<label htmlFor="description">Description</label>
						<TextInput
							name="description"
							value={workState.description}
							onChange={handleChange}
						/>
					</FormControl>
					<UpdateButton type="submit">Update Work</UpdateButton>
				</Form>
			) : (
				<Details>
					<p>
						<span>Company Name: </span> {work.company}
					</p>
					<p>
						<span>Role Title: </span> {work.roleTitle}
					</p>
					<p>
						<span>Start Date: </span> {work.startDate}
					</p>
					<p>
						<span>End Date: </span>{' '}
						{work.present ? 'Still Working' : work.endDate}
					</p>
					<p>
						<span>Work Description: </span>
						{work.description}
					</p>
				</Details>
			)}
		</StyledWorkItem>
	);
};

export default WorkItem;
const StyledWorkItem = styled.div``;
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	padding: 0.25rem 0;
	padding-bottom: 1rem;
	border-bottom: 1px solid lightgray;
`;
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
