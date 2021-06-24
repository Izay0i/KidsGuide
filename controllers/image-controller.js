const fs = require('fs');
const path = require('path');
const pathUtil = require('../utilities/path-util.js');
const pool = require('../db-connection.js');

const getImages = (request, response) => {
	pool.query(
		'select avatar from userdetails;',
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows);
		}
	);
};

const getImageByID = (request, response) => {
	const id = parseInt(request.params.id);
	
	pool.query(
		'select avatar from userdetails where uid = $1;',
		[id],
		(error, results) => {
			if (error) throw error;

			response.status(200).json(results.rows[0]);
		}
	);
};

const insertImage = (request, response) => {
	if (!request.file) {
		console.log('No file received');
		return response.send({
			success: false
		});
	}
	else {
		console.log('File received');
		return response.send({
			success: true,
			file: request.file,
			body: request.body
		});
	}
};

const updateImage = (request, response) => {
	const { id } = request.body;
	let avatarPath = request.file.path.replace(/\\/g, '//');

	(async () => {
		const client = await pool.connect();
		try {
			let results = await client.query(
				'select avatar from userdetails where uid = $1;', 
				[id]
			);
			
			if (results.rows[0].avatar) {
				const avatarDir = path.resolve(results.rows[0].avatar);

				//if the avatar has been deleted or is an url then skip the deletion
				fs.access(avatarDir, (error) => {
					if (error) {
						console.log(error);
					}
					else {
						fs.unlink(avatarDir, (error) => {
							if (error) throw error;
						});
					}
				});
			}

			results = await client.query(
				'update userdetails set avatar = $1 where uid = $2;',
				[avatarPath, id]
			);

			response.status(200).json({
				id,
				path: pathUtil.appendDNToFilePath(request, avatarPath)
			});
		}
		finally {
			client.release();
		}
	})().catch(error => console.log(error.stack));
};

module.exports = {
	getImages,
	getImageByID,
	insertImage,
	updateImage
};