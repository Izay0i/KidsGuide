const pool = require('../db-connection.js');

const getPosts = (request, response) => {
	pool.query(
		'select * from posts;',
		(error, results) => {
			if (error) throw error;

			response.status(200).send(results.rows);
		}
	);
};

const getPostsByUserID = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query(
		'select * from posts where uid = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).send(results.rows);
		}
	);
};

const getPostByID = (request, response) => {
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

const getPostByTitle = (request, response) => {
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

const createPost = (request, response) => {
	const { uid, title, content, thumbnail } = request.body;

	pool.query(
		'insert into posts (uid, title, content, thumbnail) values ($1, $2, $3, $4) returning post_id;',
		[uid, title, content, thumbnail],
		(error, results) => {
			if (error) throw error;

			response.status(201).send(`Blog added with ID: ${results.rows[0].post_id}`);
		}
	);
};

const updatePost = (request, response) => {
	const { id, title, content, thumbnail } = request.body;

	pool.query(
		`update posts 
		set title = $1, content = $2, thumbnail = $3, post_time = now() 
		where post_id = $4;`,
		[title, content, thumbnail, id],
		(error, results) => {
			if (error) throw error;

			response.status(200).send(`Post updated with ID: ${id}`);
		}
	);
};

const deletePost = (request, response) => {
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
	getPosts,
	getPostsByUserID,
	getPostByID,
	getPostByTitle,
	createPost,
	updatePost,
	deletePost
};