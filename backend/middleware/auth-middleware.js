const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const pool = require('../db-connection.js');

function verifyToken(request, response, next) {
	const header = request.headers['authorization'];
	const token = header && header.split(' ')[1];
	request.token = token;

	if (token == null) {
		return response.status(403).send({
			message: 'No token sent.'
		});
	}

	jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
		if (error) {
			return response.sendStatus(401);
		}
		
		next();
	});
}

function veritfyEmail(request, response, next) {
	const { email } = request.body;

	pool.query(
		'select * from users where email = $1;',
		[email],
		(error, results) => {
			if (error) throw error;

			if (results.rowCount > 0) {
				return response.status(400).send({
					message: 'Email is already in use.'
				});
			}

			next();
		}		
	);
}

module.exports = {
	verifyToken,
	veritfyEmail
};