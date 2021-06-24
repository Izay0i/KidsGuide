const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const pathUtil = require('../utilities/path-util.js');
const pool = require('../db-connection.js');

const expireTime = '24h';

const signUp = (request, response) => {
	const saltRounds = 10;
	const { name, address, phone, email, password } = request.body;
	let userID, userRole;

	(async () => {
		const client = await pool.connect();
		try {
			let results = await client.query(
				'insert into users (email, password) values ($1, $2) returning uid, role;',
				[email, bcrypt.hashSync(password, saltRounds)]
			);

			userID = parseInt(results.rows[0].uid);
			userRole = results.rows[0].role;

			//should I use a trigger here
			results = await client.query(
				'insert into userdetails (uid, name, address, phone_numb) values ($1, $2, $3, $4);',
				[userID, name, address, phone]
			);

			//create a token and send it back to the client
			const token = jwt.sign(
				{ uid: userID },
				process.env.SECRET_KEY,
				//{ expiresIn: expireTime }
			);

			response.status(201).json({
				uid: userID,
				role: userRole,
				avatar: null,
				accessToken: token
			});
		}
		finally {
			client.release();
		}
	})().catch(error => console.log(error.stack));
};

const signIn = (request, response) => {	
	const { email, password } = request.body;

	pool.query(
		`select users.uid, email, password, role, avatar from users 
		join userdetails 
		on users.uid = userdetails.uid 
		where email = $1;`,
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

			//ditto
			const token = jwt.sign(
				{ uid: results.rows[0].uid }, 
				process.env.SECRET_KEY,
				//{ expiresIn: expireTime }
			);

			response.status(200).json({
				uid: results.rows[0].uid,
				role: results.rows[0].role,
				avatar: pathUtil.appendDNToFilePath(request, results.rows[0].avatar),
				accessToken: token
			});
		}
	);
};

module.exports = {
	signUp,
	signIn
};