const pool = require('../db-connection.js');

const getReports = (request, response) => {
	const open_status = request.query.open;

	pool.query(
		'select * from reports where open = $1 order by report_id desc;',
		[open_status],
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

const closeReport = (request, response) => {
	const report_id = parseInt(request.params.id);

	pool.query(
		'update reports set open = FALSE where report_id = $1;',
		[report_id],
		(error, results) => {
			if (error) throw error;

			response.status(200).send(`Closed report with ID: ${report_id}`);
		}
	);
}

module.exports = {
	getReports,
	createReport,
	closeReport
};