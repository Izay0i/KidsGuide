const pool = require('../db-connection.js');

const getReports = (request, response) => {
	pool.query(
		'select * from reports order by report_id desc;',
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const createReport = (request, response) => {
	const { uid, post_id, reason } = request.body;

	pool.query(
		`insert into 
		reports (uid, post_id, reason) 
		values ($1, $2, $3) returning report_id;`,
		[uid, post_id, reason],
		(error, results) => {
			if (error) throw error;

			response.status(201).send(`Report added with ${results.rows[0].report_id}`);
		}
	);
};

const deleteReport = (request, response) => {

}

module.exports = {
	getReports,
	createReport,
	deleteReport
};