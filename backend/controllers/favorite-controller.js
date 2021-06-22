const pool = require('../db-connection.js');

const getAllFavorites = (request, response) => {
	pool.query(
		'select * from favorites;',
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const getAllFavByUID = (request, response) => {
	const uid = parseInt(request.params.id);
	
	pool.query(
		'select * from favorites where uid = $1;',
		[uid],
		(error, results) => {
			if (error) throw error;

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

	//this is called an upsert
	pool.query(
		`insert into favorites (uid, post_id) 
		values ($1, $2) 
		on conflict (post_id) do nothing;`,
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