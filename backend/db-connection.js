const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'kids_guide',
	password: '123',
	port: 5432
});

/*or use a connection string (ElephantSQL) 
const connectionString = 'URL';
const pool = new Pool({
	connectionString
});
*/

module.exports = pool;