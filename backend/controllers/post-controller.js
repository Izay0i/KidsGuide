const pool = require('../db-connection.js');

const getBlogPosts = (request, response) => {
	pool.query(
		'select * from posts;',
		(error, results) => {
			if (error) throw error;

			response.send(results.rows);
		}
	);
};

const getBlogPostByID = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query(
		'select * from posts where post_id = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows[0]);
		}
	);
};

const getBlogPostByTitle = (request, response) => {
	const title = request.query.title[0];
	
	pool.query(
		`select * from posts where title like $1 || '%';`,
		[title],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const createBlogPost = (request, response) => {
	const { title, content, thumbnail } = request.body;

	pool.query(
		'insert into posts (title, content, thumbnail) values ($1, $2, $3) returning post_id;',
		[title, content, thumbnail],
		(error, results) => {
			if (error) throw error;

			response.status(201).send(`Blog added with ID: ${results.rows[0].post_id}`);
		}
	);
};

const deleteBlogPost = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query(
		'delete from posts where post_id = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).send(`Blog deleted with ID: ${id}`);
		}
	);
};

module.exports = {
	getBlogPosts,
	getBlogPostByID,
	getBlogPostByTitle,
	createBlogPost,
	deleteBlogPost
};