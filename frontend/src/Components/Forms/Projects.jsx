import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { resumeContext } from '../../store/resumeContext';
import { Card, TextInput, UpdateButton } from '../../styles';

import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import ProjectItem from './ProjectItem';
import { addProject } from '../../api';
const Projects = ({ projects }) => {
	const { increaseValue, resumeUsername } = useContext(resumeContext);
	const [projectState, setProjectState] = useState({
		title: '',
		link: '',
		description: '',
	});
	const [openForm, setOpenForm] = useState(false);
	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};

	const handleChange = (e) => {
		setProjectState({ ...projectState, [e.target.name]: e.target.value });
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		if (
			projectState.title.length === 0 ||
			projectState.link.length === 0 ||
			projectState.description.length === 0
		) {
			window.alert('Please fill all the fileds');
			return;
		}
		try {
			const response = await addProject(projectState, resumeUsername);
			increaseValue();
			setOpenForm(false);
			setProjectState({ title: '', link: '', description: '' });
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<StyledProjects>
			<h2>Projects</h2>
			<Card>
				<Header>
					<h3>Projects</h3>
					<Edit onClick={handleOpenForm}>
						{openForm ? <AiOutlineClose /> : <AiOutlinePlus />}
					</Edit>
				</Header>
				{openForm ? (
					<Form onSubmit={submitHandler}>
						<FormControl>
							<label htmlFor="title">Project Title</label>
							<TextInput
								name="title"
								value={projectState.title}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="link">Project Link</label>
							<TextInput
								name="link"
								value={projectState.link}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="description">Project Description</label>
							<TextInput
								name="description"
								value={projectState.description}
								onChange={handleChange}
							/>
						</FormControl>
						<UpdateButton type="submit">Add Project</UpdateButton>
					</Form>
				) : (
					<>
						{projects.map((project) => (
							<ProjectItem project={project} key={project.id} />
						))}
					</>
				)}
			</Card>
		</StyledProjects>
	);
};

export default Projects;
const StyledProjects = styled.div``;
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
`;
