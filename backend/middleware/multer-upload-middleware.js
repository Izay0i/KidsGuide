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
				return fs.mkdir(dir, (error) => callback(error, dir));
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
const upload = multer({ storage: storage });

module.exports = upload;