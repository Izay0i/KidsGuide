function appendDNToFilePath(request, path) {
	return `${request.protocol}://${request.headers.host}/${path}`;
}

module.exports = {
	appendDNToFilePath
};