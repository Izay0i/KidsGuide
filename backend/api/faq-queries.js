const pool = require('../db-connection.js');

const getFaqs = (request, response) => {
	pool.query(
		'select * from faq;',
		(error, results) => {
			if (error) throw error;
			
			response.status(200).json(results.rows);
		}
	);
};

const getFaqByID = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query(
		'select * from faq where id = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const getFaqByQuestion = (request, response) => {
	const question = request.query.question[0];

	pool.query(
		`select * from faq where body->>'question' like $1 || '%';`,
		[question],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const createFaq = (request, response) => {
	const body = request.body;

	pool.query(
		'insert into faq (body) values ($1) returning id;',
		[body],
		(error, results) => {
			if (error) throw error;

			response.status(201).send(`Faq added with ID: ${results.rows[0].id}`);
		}
	);
};

const deleteFaq = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query(
		'delete from faq where id = $1;',
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
	deleteFaq
};