const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(request, file, callback) {
		const { id, type } = request.body; //type: ['users', 'posts']
		const dir = `./uploads/${type}/${id}`;

		//https://github.com/expressjs/multer/issues/556#issuecomment-663837369
		fs.access(dir, function(error) {
			if (error) {
				console.log('Directory does not exist');
				return fs.mkdir(dir, { recursive: true }, (error) => callback(error, dir));
			}
			else {
				callback(null, dir);
			}
		});
	},
	filename: function(request, file, callback) {
		const extension = file.mimetype.split('/')[1];

		callback(null, file.fieldname + '-' + Date.now() + '.' + extension);
	}
});
const maxSize = 1 * 1024 * 1024; //MB
const upload = multer({ 
	storage: storage, 
	limits: { fileSize: maxSize }
});

module.exports = upload;