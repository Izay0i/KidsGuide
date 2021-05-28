const pool = require('../db-connection.js');

const getFaqs = (request, response) => {
	pool.query(
		'select * from faqs order by faq_id asc;',
		(error, results) => {
			if (error) throw error;
			
			response.status(200).json(results.rows);
		}
	);
};

const getFaqByID = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query(
		'select * from faqs where faq_id = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows[0]);
		}
	);
};

const getFaqByQuestion = (request, response) => {
	const question = request.query.question[0];

	pool.query(
		`select * from faqs where content->>'question' like $1 || '%';`,
		[question],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const createFaq = (request, response) => {
	const { uid, content } = request.body;

	pool.query(
		'insert into faqs (uid, content) values ($1, $2) returning faq_id;',
		[uid, content],
		(error, results) => {
			if (error) throw error;

			response.status(201).send(`Faq added with ID: ${results.rows[0].faq_id}`);
		}
	);
};

const updateFaq = (request, response) => {
	const { id, content } = request.body;
	
	pool.query(
		`update faqs set content = $1 where faq_id = $2;`,
		[content, id],
		(error, results) => {
			if (error) throw error;

			response.status(200).send(`Updated faq with ID: ${id}`);
		}
	);
};

const deleteFaq = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query(
		'delete from faqs where faq_id = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).send(`Faq deleted with ID: ${id}`);
		}
	);
};

module.exports = {
	getFaqs,
	getFaqByID,
	getFaqByQuestion,
	createFaq,
	updateFaq,
	deleteFaq
};