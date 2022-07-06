import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { Card, TextInput, UpdateButton } from '../../styles';
import WorkItem from './WorkItem';
import { addWork } from '../../api';
import { resumeContext } from '../../store/resumeContext';
const Works = ({ works }) => {
	const { increaseValue, resumeUsername } = useContext(resumeContext);
	const [openForm, setOpenForm] = useState(false);
	const [workState, setWorkState] = useState({
		company: '',
		roleTitle: '',
		startDate: '',
		endDate: '',
		description: '',
		present: false,
	});
	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};
	const handleChange = (e) => {
		setWorkState({ ...workState, [e.target.name]: e.target.value });
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
			const response = await addWork(workState, resumeUsername);
			increaseValue();
			setOpenForm(false);
			setWorkState({
				company: '',
				roleTitle: '',
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
		<StyledWorks>
			<h2>Experience</h2>
			<Card>
				<Header>
					<h3>Works</h3>
					<Edit onClick={handleOpenForm}>
						{openForm ? <AiOutlineClose /> : <AiOutlinePlus />}
					</Edit>
				</Header>
				{openForm && (
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
								value={workState.title}
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
									}}
								/>
							</span>
							{!workState.present && (
								<TextInput
									name="endDate"
									value={workState.endDate}
									onChange={handleChange}
								/>
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
						<UpdateButton type="submit">Add Work</UpdateButton>
					</Form>
				)}
				{!openForm && (
					<>
						{works.map((work) => (
							<WorkItem work={work} key={work.id} />
						))}
					</>
				)}
			</Card>
		</StyledWorks>
	);
};

export default Works;
const StyledWorks = styled.div``;
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
