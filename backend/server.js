const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });
// handle uncaught exceptions
process.on('uncaughtException', err => {
	console.log(`Error: ${err.stack}`);
	console.log(`Shutting Down serve due to uncaught exceptions`);
	process.exit(1);
});
// connect to db
connectDatabase();

const server = app.listen(process.env.PORT, () => {
	console.log(
		`listening on ${process.env.PORT} PORT in ${process.env.NODE_ENV} mode.`
	);
});
// handle unhandle promise rejection
process.on('unhandledRejection', err => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down server due to unhandled promise rejection`);
	server.close(() => {
		process.exit(1);
	});
});
