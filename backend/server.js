const express = require('./config/express'),
	mongoose = require('mongoose');

// Use env port or default
const port = process.env.PORT || 5000;

//establish socket.io connection

const app = express.init();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.of('/api/socket').on('connection', (socket) => {
	console.log('socket.io: User connected: ', socket.id);

	socket.on('disconnect', () => {
		console.log('socket.io: User disconnected: ', socket.id);
	});
});

server.listen(port, () => console.log(`Server now running on port ${port}!`));
//connect to db
mongoose.connect(process.env.DB_URI || require('./config/config').db.uri, {
	useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connected');

	console.log('Setting change streams');
	const resumeChangeStream = connection.collection('resumes').watch();

	resumeChangeStream.on('change', (change) => {
		switch (change.operationType) {
			case 'insert':
				const resume = {
					// _id: change.fullDocument._id,
					// name: change.fullDocument.name,
					// email: change.fullDocument.email,
					...change.fullDocument,
				};

				io.of('/api/socket').emit('newResume', resume);
				break;

			case 'delete':
				io.of('/api/socket').emit('deletedResume', change.documentKey._id);
				break;
			case 'update': {
				io.of('/api/socket').emit(
					'updatedResume',
					change.updateDescription.updatedFields
				);
				console.log(change.updateDescription.updatedFields);
			}
		}
	});
});
