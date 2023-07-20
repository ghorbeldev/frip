const express = require('express');
const products = require('./routes/product');
const auth = require('./routes/auth');
const errorMiddleware = require('./middlewares/errors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const order = require('./routes/order');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const root = require('path').join(__dirname, '../frontend', 'build');
dotenv.config({ path: 'backend/config/config.env' });
app.use(
	express.json({
		limit: '50mb',
	})
);
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		parameterLimit: 100000,
		extended: true,
	})
);
app.use(cookieParser());
app.use(fileUpload());
// setting up cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Import all routes

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use(errorMiddleware);
if (process.env.NODE_ENV.trim() === 'PRODUCTION') {
	app.use(express.static(root));
	app.get('*', (req, res) => {
		res.sendFile('index.html', { root });
	});
}
module.exports = app;
