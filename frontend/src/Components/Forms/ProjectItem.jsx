import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { TextInput, UpdateButton } from '../../styles';
import { resumeContext } from '../../store/resumeContext';
import { deleteProject, updateProject } from '../../api';
const ProjectItem = ({ project }) => {
	const { increaseValue, resumeUsername } = useContext(resumeContext);
	const [openForm, setOpenForm] = useState(false);
	const [projectState, setProjectState] = useState(project);
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
			const response = await updateProject(
				resumeUsername,
				projectState.id,
				projectState.title,
				projectState.link,
				projectState.description
			);
			increaseValue();
			setOpenForm(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleDelete = async () => {
		try {
			const response = await deleteProject(resumeUsername, project.id);
			console.log(response);
			increaseValue();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Header>
				<h3>Project</h3>
				<Options>
					{openForm || (
						<Edit onClick={handleDelete}>
							<AiOutlineDelete />
						</Edit>
					)}
					<Edit onClick={handleOpenForm}>
						{openForm ? <AiOutlineClose /> : <BsPencil />}
					</Edit>
				</Options>
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
					<UpdateButton type="submit">Update</UpdateButton>
				</Form>
			) : (
				<div>
					<p>
						<span>Title: </span> {project.title}
					</p>
					<p>
						<span>Project Link: </span> {project.link}
					</p>
					<p>
						<span>Project Description: </span>
						{project.description}
					</p>
				</div>
			)}
		</div>
	);
};

export default ProjectItem;
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
	justify-content: center;
	align-items: center;
	gap: 1.5rem;
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
