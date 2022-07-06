import axios from 'axios';

const getResumeByUsername = async (username) => {
	const response = await axios.get(
		`http://localhost:5000/api/getResume/${username}`
	);
	return response.data;
};

const addResume = async (username) => {
	const response = await axios.post('http://localhost:5000/api/addResume', {
		username,
	});
	return response.data;
};

const addContact = async (contact, username) => {
	const response = axios.post('http://localhost:5000/api/addContact', {
		contact,
		username,
	});
	return (await response).data;
};
const addInterest = async (interest, username) => {
	const response = axios.post('http://localhost:5000/api/addInterest', {
		interest,
		username,
	});
	return (await response).data;
};
const deleteInterest = async (id, username) => {
	const response = axios.post('http://localhost:5000/api/deleteInterest', {
		id,
		username,
	});
	return (await response).data;
};
const addEducation = async (education, username) => {
	console.log(education);
	const response = axios.post('http://localhost:5000/api/addEducation', {
		education,
		username,
	});
	return (await response).data;
};
const deleteEducation = async (username, id) => {
	const response = axios.post('http://localhost:5000/api/deleteEducation', {
		username,
		id,
	});
	return (await response).data;
};
const updateEducation = async (
	username,
	id,
	institution,
	educationType,
	field,
	grade,
	startDate,
	endDate,
	present,
	description
) => {
	const response = axios.post('http://localhost:5000/api/updateEducation', {
		username,
		id,
		institution,
		educationType,
		field,
		grade,
		startDate,
		endDate,
		present,
		description,
	});
	return response;
};
const addWork = async (work, username) => {
	const response = axios.post('http://localhost:5000/api/addWork', {
		work,
		username,
	});
	return (await response).data;
};
const deleteWork = async (username, id) => {
	const response = axios.post('http://localhost:5000/api/deleteWork', {
		username,
		id,
	});
	return (await response).data;
};
const updateWork = async (
	username,
	id,
	company,
	roleTitle,
	startDate,
	endDate,
	present,
	description
) => {
	const response = axios.post('http://localhost:5000/api/updateWork', {
		username,
		id,
		company,
		roleTitle,
		startDate,
		endDate,
		present,
		description,
	});
	return response;
};
const addPersonalDetails = async (personalDetails, username) => {
	const response = axios.post('http://localhost:5000/api/addPersonalDetails', {
		personalDetails,
		username,
	});
	return (await response).data;
};
const addProject = async (project, username) => {
	const response = axios.post('http://localhost:5000/api/addProject', {
		project,
		username,
	});
	return (await response).data;
};
const deleteProject = async (username, id) => {
	const response = axios.post('http://localhost:5000/api/deleteProject', {
		username,
		id,
	});
	return (await response).data;
};
const updateProject = async (username, id, title, link, description) => {
	const response = axios.post('http://localhost:5000/api/updateProject', {
		username,
		id,
		title,
		link,
		description,
	});
	return response;
};
export {
	addContact,
	addEducation,
	deleteEducation,
	updateEducation,
	addWork,
	deleteWork,
	updateWork,
	addInterest,
	deleteInterest,
	addPersonalDetails,
	addProject,
	deleteProject,
	updateProject,
	addResume,
	getResumeByUsername,
};
