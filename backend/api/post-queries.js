const pool = require('../db-connection.js');

const getBlogPosts = (response, request) => {
	pool.query(
		'select * from test_blog;',
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const getBlogPostByID = (response, request) => {
	const id = parseInt(request.params.id);

	pool.query(
		'select * from test_blog where id = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const getBlogPostByTitle = (response, request) => {
	const title = request.query.title[0];
	
	pool.query(
		`select * from test_blog where title like $1 || '%';`,
		[title],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const createBlogPost = (response, request) => {
	const { title, content, banner } = request.body;

	pool.query(
		'insert into test_blog (title, content, banner) values ($1, $2, $3) returning id;',
		[title, content, banner],
		(error, results) => {
			if (error) throw error;

			response.status(201).send(`Blog added with ID: ${results.rows[0].id}`);
		}
	);
};

const deleteBlogPost = (response, request) => {
	const id = parseInt(request.params.id);

	pool.query(
		'delete from test_blog where id = $1;',
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