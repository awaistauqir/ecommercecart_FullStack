const { Schema, model } = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const resumeSchema = new Schema({
	username: reqString,
	projects: [],
	education: [],
	work: [],
	interests: [],
	contaact: { type: Schema.Types.Mixed, default: {} },
	personalDetails: { type: Schema.Types.Mixed, default: {} },
});
module.exports = model('Resume', resumeSchema);
