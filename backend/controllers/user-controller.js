const bcrypt = require('bcrypt');
const pool = require('../db-connection.js');

const saltRounds = 10;

//get email, password (salted, see bcrypt), name, address, phone, avatar (if any)
const getUsers = (request, response) => {
	pool.query(
		`select email, name, address, phone_numb, avatar from users 
		join userdetails 
		on users.uid = userdetails.uid;`,
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const getUserByID = (request, response) => {
	const uid = parseInt(request.params.id);

	pool.query(
		`select email, name, address, phone_numb, avatar from users 
		join userdetails 
		on users.uid = userdetails.uid 
		where users.uid = $1;`,
		[uid],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows[0]);
		}
	);
};

const getUserByName = (request, response) => {
	const name = request.query.name;

	pool.query(
		`select email, name, address, phone_numb, avatar from users 
		join userdetails 
		on users.uid = userdetails.uid 
		where userdetails.name = $1;`,
		[name],
		(error, results) => {
			if (error) throw erorr;

			response.status(200).json(results.rows);
		}
	);
};

const updateUserEmail = (request, response) => {
	const { uid, email } = request.body;

	pool.query(
		'update users set email = $1 where uid = $2;',
		[email, uid],
		(error, results) => {
			if (error) throw error;

			response.status(200).send(`Updated email for user ${uid}`);
		}
	);
};

const updateUserPassword = (request, response) => {
	const { uid, password } = request.body;

	pool.query(
		'update users set password = $1 where uid = $2;',
		[bcrypt.hashSync(password, saltRounds), uid],
		(error, results) => {
			if (error) throw error;

			response.status(200).json({ message: `Updated password for user ${uid}` });
		}
	);
};

const updateUserDetails = (request, response) => {
	const { 
		uid, 
		name, 
		address, 
		phone_numb, 
		avatar 
	} = request.body;

	pool.query(
		`update userdetails 
		set name = $1, address = $2, phone_numb = $3, avatar = $4 
		where uid = $5;`,
		[name, address, phone_numb, avatar, uid],
		(error, results) => {
			if (error) throw error;

			response.status(200).json({
				name, 
				address, 
				phone_numb, 
				avatar
			});
		}
	);
};

//update all information
const updateUserInfo = (request, response) => {
	const {
		uid,
		email,
		name,
		address,
		phone_numb,
		avatar
	} = request.body;

	(async () => {
		const client = await pool.connect();

		try {
			let results = await client.query(
				`update users set email = $1 where uid = $2;`,
				[email, uid]
			);

			results = await client.query(
				`update userdetails 
				set name = $1, address = $2, phone_numb = $3, avatar = $4 
				where uid = $5;`,
				[name, address, phone_numb, avatar, uid]
			);

			response.status(200).json({
				email,
				name,
				address,
				phone_numb,
				avatar
			});
		}
		finally {
			client.release();
		}
	})().catch(error => console.log(error.stack));
};

module.exports = {
	getUsers,
	getUserByID,
	getUserByName,
	updateUserEmail,
	updateUserPassword,
	updateUserDetails,
	updateUserInfo
};