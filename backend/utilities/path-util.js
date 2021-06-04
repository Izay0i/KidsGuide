/**
 * The function takes in two arguments
 * @param { Request } request
 * @param { string } path - image path
 * @returns a domain name with the specified image path
 */
function appendDNToFilePath(request, path) {
	return `${request.protocol}://${request.headers.host}/${path}`;
}

module.exports = {
	appendDNToFilePath
};