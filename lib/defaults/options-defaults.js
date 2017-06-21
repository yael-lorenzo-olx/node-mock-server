
module.exports = {
	restPath: './rest',
	title: 'Payment Provider Mock API',
	version: 1,
	urlBase: 'http://qamockserver.test.apps.stg.us-east-1.horizontals.olx.org:3001',
	urlPath: '',
	port: 3001,
	contentType: 'application/json',
	accessControlExposeHeaders: 'X-Total-Count',
	accessControlAllowOrigin: '*',
	accessControlAllowMethods: 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
	accessControlAllowHeaders: 'origin, x-requested-with, content-type',
	headers: {},
};
