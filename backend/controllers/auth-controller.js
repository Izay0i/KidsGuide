const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const pool = require('../db-connection.js');

const signUp = (request, response) => {
	const saltRounds = 10;
	const { name, address, phone, email, password } = request.body;
	let userID;

	(async () => {
		const client = await pool.connect();
		try {
			let results = await client.query(
				'insert into users (email, password) values ($1, $2) returning uid;',
				[email, bcrypt.hashSync(password, saltRounds)]
			);

			userID = parseInt(results.rows[0].uid);

			//should I use a trigger here
			results = await client.query(
				'insert into userdetails (uid, name, address, phone_numb) values ($1, $2, $3, $4);',
				[userID, name, address, phone]
			);
		}
		finally {
			client.release();
			response.status(201).send('User and details added to database.');
		}
	})().catch(error => console.log(error.stack));
};

const signIn = (request, response) => {	
	const { email, password } = request.body;

	pool.query(
		'select * from users where email = $1;',
		[email],
		(error, results) => {
			if (error) throw error;

			if (results.rowCount === 0) {
				return response.status(404).send({
					message: 'User not found or deleted.'
				});
			}

			if (!bcrypt.compareSync(password, results.rows[0].password)) {
				return response.sendStatus(401);
			}

			let token = jwt.sign(
				{ uid: results.rows[0].uid }, 
				process.env.SECRET_KEY, 
				{ expiresIn: 86400 } //24 hours
			);

			response.status(200).send({
				uid: results.rows[0].uid,
				role: results.rows[0].role,
				email: email,
				accessToken: token
			});
		}
	);
};

module.exports = {
	signUp,
	signIn
};