const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'testdb',
	password: '123',
	port: 5432
});

pool.on('error', (err, client) => {
	console.error('Error: ', err);
});

var query = `select * from users`;
//query = `update users set age = 21 where email = 'izay0i@gmail.com';`;
//query = `delete from users where email = 'izay0i@gmail.com'`;


(async () => {
	try {
		const client = await pool.connect();
		const res = await client.query(query);

		console.log("Connected to the database");

		for (let row of res.rows) {
			console.log(`Email: ${row.email}`);
			console.log(`Full name: ${row.firstname} ${row.lastname}`);
			console.log(`Age: ${row.age}`);
		}

		client.release();
	}
	catch (err) {
		console.error(err);
	}
	finally {
		console.log('Disconnected from the database');
		pool.end();
	}
})();