const pool = require('../db-connection.js');

const getQuizzes = (request, response) => {
	pool.query(
		'select * from quizzes',
		(error, results) => {
			if (error) throw error;

			response.status(200).send(results.rows);
		}
	);
};

const getQuizByID = (request, response) => {
	const id = parseInt(request.params.id);
	
	pool.query(
		'select * quizzes where quiz_id = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows[0]);
		}
	);
};

const getQuizByPostID = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query(
		'select * from quizzes where post_id = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows[0]);
		}
	);
};

const addQuiz = (request, response) => {
	const { post_id, content } = request.body;

	pool.query(
		'insert into quizzes (post_id, content) values ($1, $2) returning quiz_id;',
		[post_id, content],
		(error, results) => {
			if (error) throw error;

			response.status(201).send(`Added quiz with ID: ${results.rows[0].quiz_id}`);
		}
	);
};

const updateQuiz = (request, response) => {
	const { post_id, content } = request.body;

	pool.query(
		'update quizzes set content = $1 where post_id = $2;',
		[content, post_id],
		(error, results) => {
			if (error) throw error;

			response.status(200).send(`Quiz updated with post ID: ${post_id}`);
		}
	);
};

const deleteQuiz = (request, response) => {
	const id = parseInt(request.params.id); //post_id

	pool.query(
		'delete from quizzes where post_id = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).send(`Deleted quiz with post ID: ${id}`);
		}
	);
};

module.exports = {
	getQuizzes,
	getQuizByID,
	getQuizByPostID,
	addQuiz,
	updateQuiz,
	deleteQuiz
};