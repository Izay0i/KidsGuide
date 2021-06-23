const pathUtil = require('../utilities/path-util.js');
const pool = require('../db-connection.js');

const getAllFavorites = (request, response) => {
	pool.query(
		'select * from favorites order by fav_id desc;',
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const getAllFavByUID = (request, response) => {
	const uid = parseInt(request.params.id);
	
	pool.query(
		`select fav_id, f.post_id, title, thumbnail, post_time 
		from favorites f join posts p on f.post_id = p.post_id 
		where f.uid = $1 
		order by fav_id desc;`,
		[uid],
		(error, results) => {
			if (error) throw error;

			results.rows.forEach(row => {
				row.thumbnail = pathUtil.appendDNToFilePath(request, row.thumbnail);
			});
			response.status(200).json(results.rows);
		}
	);
};

const getFavCountByPostID = (request, response) => {
	const post_id = parseInt(request.params.id);

	pool.query(
		'select count(post_id) from favorites where post_id = $1;',
		[post_id],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows[0].count);
		}
	);
};

const createFavorite = (request, response) => {
	const { uid, post_id } = request.body;

	/**
	 * insert into favorites where post_id doesn't exist (yet) for uid
	 * concurrency be damned
	 */
	pool.query(
		`insert into favorites (uid, post_id) 
		select $1, $2 where not exists 
		(select post_id from favorites where uid = $1 and post_id = $2);`,
		[uid, post_id],
		(error, results) => {
			if (error) throw error;

			response.status(201).send('Favorite added');
		}
	);
};

const deleteFavorite = (request, response) => {
	const fav_id = parseInt(request.params.id);

	pool.query(
		'delete from favorites where fav_id = $1;',
		[fav_id],
		(error, results) => {
			if (error) throw error;

			response.status(200).send(`Deleted favorite with ID: ${fav_id}`);
		}
	);
};

module.exports = {
	getAllFavorites,
	getAllFavByUID,
	getFavCountByPostID,
	createFavorite,
	deleteFavorite
};