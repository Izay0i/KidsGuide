const fs = require('fs');
const path = require('path');
const pathUtil = require('../utilities/path-util.js');
const pool = require('../db-connection.js');

const getPosts = (request, response) => {
	pool.query(
		'select * from posts order by post_id desc;',
		(error, results) => {
			if (error) throw error;

			results.rows.forEach(row => {
				row.thumbnail = pathUtil.appendDNToFilePath(request, row.thumbnail);
			});
			response.status(200).send(results.rows);
		}
	);
};

const getPostsByUserID = (request, response) => {
	const id = parseInt(request.params.id);

	pool.query(
		'select * from posts where uid = $1 order by post_id desc;',
		[id],
		(error, results) => {
			if (error) throw error;

			results.rows.forEach(row => {
				row.thumbnail = pathUtil.appendDNToFilePath(request, row.thumbnail);
			});
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

			results.rows.forEach(row => {
				row.thumbnail = pathUtil.appendDNToFilePath(request, row.thumbnail);
			});
			response.status(200).json(results.rows[0]);
		}
	);
};

const getPostByTitle = (request, response) => {
	const title = request.query.title[0];
	const tags = request.query.title;

	pool.query(
		`select * from posts where title like $1 || '%' or $2 = any(tags);`,
		[title, tags],
		(error, results) => {
			if (error) throw error;

			results.rows.forEach(row => {
				row.thumbnail = pathUtil.appendDNToFilePath(request, row.thumbnail);
			});
			response.status(200).json(results.rows);
		}
	);
};

const createPost = (request, response) => {
	const { id, title, content, vid_url, tags } = request.body;
	let thumbnail = request.file.path.replace(/\\/g, '//');

	pool.query(
		`insert into posts (uid, title, content, thumbnail, vid_url, tags) 
		values ($1, $2, $3, $4, $5, $6) returning post_id;`,
		[id, title, content, thumbnail, vid_url, JSON.parse(tags)],
		(error, results) => {
			if (error) throw error;

			response.status(201).json({
				post_id: results.rows[0].post_id
			});
		}
	);

	// response.status(200).json({
	// 	file: request.file,
	// 	body: request.body
	// });
};

/**
	 * Okay, let me give you a quick run down on this, in case you don't know what's going after
	 * a few months of not coding your way out of boredom.
	 * 
	 * @param { integer } id - the user ID (mandatory) is needed to access a subdirectory that already exits, 
	 * 							else multer will create an 'undefined' subdirectory
	 * @param { integer } post_id - the post ID
	 * @param { string } title - the post title
	 * @param { string } content - the post content (or body)
	 * @param { string } tags - the post tags, is a stringified JSON (important),
	 *							else form-data will parse the array as a string with comma-seperatted elements
	 *
	 *The function queries the database for the thumbnail of a post with ID = post_id.
	 *It then gets the full path of that thumbnail, accesses the subdirectory of that thumbnail,
	 *and deletes (unlink) that thumbnail.
	 *It then replaces the old thumbnail path with a new one.
	 */
const updatePost = (request, response) => {
	const { post_id, title, content, vid_url, tags } = request.body;
	let thumbnail = '';
	if (request.file) {
		thumbnail = request.file.path.replace(/\\/g, '//');
	}

	(async () => {
		const client = await pool.connect();
		try {
			let results = await client.query(
				`select thumbnail from posts where post_id = $1`,
				[post_id]
			);
			
			if (request.file) {
				const thumbnailDir = path.resolve(results.rows[0].thumbnail);

				fs.access(thumbnailDir, (error) => {
					if (error) {
						console.log(error);
					}
					else {
						fs.unlink(thumbnailDir, (error) => {
							if (error) {
								console.log(error);
							}
						});
					}
				});
			}
			else {
				thumbnail = results.rows[0].thumbnail;
			}

			results = await client.query(
				`update posts 
				set title = $1, content = $2, thumbnail = $3, vid_url = $4, tags = $5, post_time = now() 
				where post_id = $6;`,
				[title, content, thumbnail, vid_url, JSON.parse(tags), post_id]
			);

			response.status(200).json({
				post_id
			});
		}
		finally {
			client.release();
		}
	})().catch(error => console.log(error.stack));
};

const deletePost = (request, response) => {
	const id = parseInt(request.params.id);

	(async () => {
		const client = await pool.connect();
		try {
			let results = await client.query(
				`select thumbnail from posts where post_id = $1`,
				[id]
			);
			const thumbnailDir = path.resolve(results.rows[0].thumbnail);

			fs.access(thumbnailDir, (error) => {
				if (error) {
					console.log(error);
				}
				else {
					fs.unlink(thumbnailDir, (error) => {
						if (error) {
							console.log(error);
						}
					});
				}
			});

			results = await client.query(
				'delete from posts where post_id = $1;',
				[id]
			);

			response.status(200).send(`Blog deleted with ID: ${id}`);
		}
		finally {
			client.release();
		}
	})().catch(error => console.log(error.stack));
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