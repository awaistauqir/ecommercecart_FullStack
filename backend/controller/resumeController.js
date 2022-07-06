const { MongoClient } = require('mongodb');
const uniqid = require('uniqid');
const { db } = require('../config/config');
const Resume = require('../models/Resume');
const getResumeByUsername = async (req, res) => {
	const username = req.params.username;
	if (username.includes(' ')) {
		return res.status(304).json({
			success: false,
			data: null,
			message: "username can't contain spaces",
		});
	}
	try {
		const resume = await Resume.findOne({ username: username });
		if (!resume) {
			return res.status(304).json({
				success: false,
				data: null,
				message: 'no document found with existing username',
			});
		}
		return res.status(200).json({ success: true, data: resume });
	} catch (error) {
		console.log('Error with fetching resumes: ', error);
		return res.status(400).json({
			success: false,
			message: 'Error with fetching resumes. See server console for more info.',
		});
	}
};
const addResume = async (req, res) => {
	try {
		if (!req.body.username) {
			return res.staus(400).json({
				success: false,
				message: 'Error with adding resume. See server console for more info.',
			});
		}
		const resumeExists = await Resume.exists({ username: req.body.username });
		if (resumeExists) {
			const existingResume = await Resume.findOne({
				username: req.body.username,
			});

			return res.status(200).json({
				success: true,
				data: existingResume,
				message: 'Document already exists',
			});
		}
		Resume.create(
			{
				username: req.body.username,
			},
			(err, response) => {
				// console.log(res);
				return res.status(200).json({
					message: 'Successfully created new document',
					data: response,
					success: true,
				});
				if (err) {
					res.status(500).json(err);
				}
			}
		);
	} catch (error) {
		res.json(error);
	}
};
const addPersonalDetails = async (req, res) => {
	const client = new MongoClient(db.uri);

	try {
		const { personalDetails, username } = req.body;

		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');

		if (
			!personalDetails.github ||
			!personalDetails.linkedin ||
			!personalDetails.portfolio ||
			!username
		) {
			return res.status(400).json({
				success: false,
				data: null,
				message:
					'Please enter portfolio, Github and linkedIn links or enter correct username',
			});
		}
		const filter = { username: username };
		const options = {
			upsert: false,
		};
		const updateDoc = {
			$set: {
				personalDetails: personalDetails,
			},
		};
		const result = await resumes.updateOne(filter, updateDoc, options);

		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (e) {
		return res.status(400).json({
			success: false,
			data: null,
			message: e.message,
		});
	} finally {
		client.close();
	}
};

const addProject = async (req, res) => {
	const { project, username } = req.body;
	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		if (!project.title || !project.link || !project.description || !username) {
			res.status(400).json({
				success: false,
				data: null,
				message:
					'Please enter title, link and decription or enter correct username',
			});
		}
		const filter = { username: username };
		const options = {
			upsert: false,
		};
		const updateDoc = {
			$push: {
				projects: { ...project, id: uniqid() },
			},
		};
		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			data: null,
			message: error.message,
		});
	} finally {
		client.close();
	}
};
const deleteProject = async (req, res) => {
	const { id, username } = req.body;
	// console.log(req.body);
	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		const filter = { username };
		const options = {
			upsert: false,
			multi: true,
		};

		const updateDoc = {
			$pull: {
				projects: { id },
			},
		};

		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			data: null,
			message: err.message,
		});
	} finally {
		client.close();
	}
};
const updateProject = async (req, res) => {
	const { id, title, link, description, username } = req.body;
	// console.log(req.body);

	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		const filter = { username, projects: { $elemMatch: { id } } };
		const options = {
			upsert: false,
			multi: true,
		};

		const updateDoc = {
			$set: {
				'projects.$.title': title,
				'projects.$.link': link,
				'projects.$.description': description,
			},
		};

		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			data: null,
			message: error.message,
		});
	} finally {
		client.close();
	}
};

const addWork = async (req, res) => {
	const { work, username } = req.body;
	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		if (
			!work.company ||
			!work.roleTitle ||
			!work.startDate ||
			!work.description ||
			!username
		) {
			return res.status(400).json({
				success: false,
				data: null,
				message:
					'Please enter company name, role title, start date, end date and decription or enter correct username',
			});
		}
		const filter = { username: username };
		const options = {
			upsert: false,
		};
		const updateDoc = {
			$push: {
				work: {
					...work,
					id: uniqid(),
					endDate: work.present ? '' : work.endDate,
				},
			},
		};
		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			data: null,
			message: error.message,
		});
	} finally {
		client.close();
	}
};
const deleteWork = async (req, res) => {
	const { id, username } = req.body;
	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		const filter = { username };
		const options = {
			upsert: false,
			multi: true,
		};
		const updateDoc = {
			$pull: {
				work: { id },
			},
		};

		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			data: null,
			message: error.message,
		});
	} finally {
		client.close();
	}
};
const updateWork = async (req, res) => {
	const {
		username,
		id,
		company,
		roleTitle,
		description,
		startDate,
		endDate,
		present,
	} = req.body;

	console.log(req.body);

	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		const filter = { username, work: { $elemMatch: { id } } };
		const options = {
			upsert: false,
			multi: true,
		};

		const updateDoc = {
			$set: {
				'work.$.company': company,
				'work.$.roleTitle': roleTitle,
				'work.$.startDate': startDate,
				'work.$.description': description,
				'work.$.present': present,
				'work.$.endDate': present ? '' : endDate,
			},
		};

		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			data: null,
			message: error.message,
		});
	} finally {
		client.close();
	}
};

const addEducation = async (req, res) => {
	console.log(req.body);
	const { education, username } = req.body;
	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		if (
			!education.institution ||
			!education.educationType ||
			!education.field ||
			!education.grade ||
			!education.startDate ||
			!education.description ||
			!username
		) {
			return res.status(400).json({
				success: false,
				data: null,
				message:
					'Please enter institution name, role title, start date, end date and decription or enter correct username',
			});
		}
		const filter = { username: username };
		const options = {
			upsert: false,
		};
		const updateDoc = {
			$push: {
				education: { ...education, id: uniqid() },
			},
		};
		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			data: null,
			message: err.message,
		});
	} finally {
		client.close();
	}
};

const deleteEducation = async (req, res) => {
	const { id, username } = req.body;
	console.log(req.body);
	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		const filter = { username };
		const options = {
			upsert: false,
			multi: true,
		};

		const updateDoc = {
			$pull: {
				education: { id },
			},
		};

		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			data: null,
			message: error.message,
		});
	} finally {
		client.close();
	}
};
const updateEducation = async (req, res) => {
	const {
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
	} = req.body;

	console.log(req.body);

	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		const filter = { username, education: { $elemMatch: { id } } };
		const options = {
			upsert: false,
			multi: true,
		};

		const updateDoc = {
			$set: {
				'education.$.institution': institution,
				'education.$.educationType': educationType,
				'education.$.field': field,
				'education.$.grade': grade,
				'education.$.startDate': startDate,
				'education.$.description': description,
				'education.$.present': present,
				'education.$.endDate': present ? '' : endDate,
			},
		};

		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			data: null,
			message: error.message,
		});
	} finally {
		client.close();
	}
};
const addInterest = async (req, res) => {
	const { username, interest } = req.body;
	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		if (!username || !interest) {
			return res.status(400).json({
				success: false,
				data: null,
				message: 'Please enter username and interest',
			});
		}
		const filter = { username: username };
		const options = {
			upsert: false,
		};
		const updateDoc = {
			$push: {
				interests: { interest, id: uniqid() },
			},
		};
		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			data: null,
			message: err.message,
		});
	} finally {
		client.close();
	}
};
const deleteInterest = async (req, res) => {
	const { username, id } = req.body;
	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		const filter = { username: username };
		const options = {
			upsert: false,
		};
		const updateDoc = {
			$pull: {
				interests: { id },
			},
		};
		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			data: null,
			message: error.message,
		});
	} finally {
		client.close();
	}
};

const addContact = async (req, res) => {
	const { username, contact } = req.body;
	const client = new MongoClient(db.uri);
	try {
		await client.connect();
		const database = client.db('app-data');
		const resumes = database.collection('resumes');
		if (!username || !contact.email || !contact.phone || !contact.name) {
			return res.status(400).json({
				success: false,
				data: null,
				message: 'Please enter username and contact info',
			});
		}
		const filter = { username: username };
		const options = {
			upsert: false,
		};
		const updateDoc = {
			$set: {
				contact: contact,
			},
		};
		const result = await resumes.updateOne(filter, updateDoc, options);
		return res.json({
			message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			data: null,
			message: err.message,
		});
	} finally {
		client.close();
	}
};
module.exports = {
	getResumeByUsername,
	addResume,
	addPersonalDetails,
	addProject,
	deleteProject,
	updateProject,
	addWork,
	deleteWork,
	updateWork,
	addEducation,
	deleteEducation,
	updateEducation,
	addInterest,
	deleteInterest,
	addContact,
};
