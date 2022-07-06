const express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	resumeRoutes = require('../routes/resumeRoutes'),
	cors = require('cors');

module.exports.init = () => {
	//initialize app
	const app = express();

	app.use(cors());

	//morgan used for logging HTTP requests to the console
	app.use(morgan('dev'));

	//bodyParser middleware used for resolving the req and res body objects (urlEncoded and json formats)
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	//add routers
	app.use('/api', resumeRoutes);

	return app;
};
