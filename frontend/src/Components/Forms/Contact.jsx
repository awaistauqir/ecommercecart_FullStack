import React, { useContext, useState } from 'react';
import { resumeContext } from '../../store/resumeContext';
import styled from 'styled-components';
import { Card, TextInput, UpdateButton } from '../../styles';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { addContact } from '../../api';
const Contact = ({ contactDetails }) => {
	const { increaseValue, resumeUsername } = useContext(resumeContext);
	const [openForm, setOpenForm] = useState(false);
	const [contact, setContact] = useState(contactDetails);
	const handleChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};
	const handleOpenForm = () => {
		setOpenForm(!openForm);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contact?.email)) {
			window.alert('Please enter a valid email');
			return;
		}
		if (
			contact.email.length === 0 ||
			contact.name.length === 0 ||
			contact.phone.length === 0 ||
			!contact
		) {
			window.alert('Fields cannot be empty');
			return;
		}
		try {
			const response = await addContact(contact, resumeUsername);
			increaseValue();
			setOpenForm(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<StyledContact>
			<h2>Contact</h2>
			<Card>
				<Header>
					<h3>Contact Informaton</h3>
					<Edit onClick={handleOpenForm}>
						{openForm ? <AiOutlineClose /> : <BsPencil />}
					</Edit>
				</Header>
				{openForm ? (
					<Form onSubmit={submitHandler}>
						<FormControl>
							<label htmlFor="name">Full Name</label>
							<TextInput
								name="name"
								value={contact ? contact.name : ''}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="email">Email</label>
							<TextInput
								name="email"
								value={contact ? contact.email : ''}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<label htmlFor="phone">Phone</label>
							<TextInput
								name="phone"
								value={contact ? contact.phone : ''}
								onChange={handleChange}
							/>
						</FormControl>
						<UpdateButton type="submit">Update</UpdateButton>
					</Form>
				) : contact ? (
					<Details>
						<h2>Contact</h2>
						<p>
							<span>Full Name: </span> {contact ? contact.name : ''}
						</p>
						<p>
							<span>Email: </span> {contact ? contact.email : ''}
						</p>
						<p>
							<span>Phone: </span> {contact ? contact.phone : ''}
						</p>
					</Details>
				) : (
					''
				)}
			</Card>
		</StyledContact>
	);
};

export default Contact;
const StyledContact = styled.div`
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
const Details = styled.div``;
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
