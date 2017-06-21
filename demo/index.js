
var mockServer = require('./../mock-server.js');
var dest = __dirname + '/rest';
var replacePathsStr = '/v2/{baseSiteId}';
var responseFuncPath = __dirname + '/func-imported';
let fs = require('fs');

// http://petstore.swagger.io/v2/swagger.json
// http://localhost:3001/src/swagger/swagger-demo-docs.json

mockServer({
	restPath: dest,
	dirName: __dirname,
	funcPath: [
		__dirname + '/func',
		__dirname + '/func2',
		responseFuncPath,
	],
	headers: {
		'Global-Custom-Header': 'Global-Custom-Header',
	},
	customDTOToClassTemplate: __dirname + '/templates/dto_es6flow.ejs',
    middleware: {
        '/rest/#{apiVersion}/#{merchantId}#hostedcheckouts/POST'(serverOptions, requestOptions) {
            let filepath = __dirname + '/rest/#{apiVersion}/#{merchantId}#hostedcheckouts/POST/mock/middleware.json';

            let endpointConfig = JSON.parse(fs.readFileSync(filepath, 'utf8'));
            requestOptions.res.statusCode = endpointConfig.response.status;

            return 'success';
        },
        '/rest/#{apiVersion}/#{merchantId}#payments#{paymentId}#refund/POST'(serverOptions, requestOptions) {
            let filepath = __dirname +
				'/rest/#{apiVersion}/#{merchantId}#payments#{paymentId}#refund/POST/mock/middleware.json';

            let endpointConfig = JSON.parse(fs.readFileSync(filepath, 'utf8'));
            requestOptions.res.statusCode = endpointConfig.response.status;

            return 'success';
        }
    },
	swaggerImport: {
		protocol: 'http',
		authUser: undefined,
		authPass: undefined,
		host: 'petstore.swagger.io',
		port: 80,
		path: '/v2/swagger.json',
		dest: dest,
		replacePathsStr: replacePathsStr,
		createErrorFile: true,
		createEmptyFile: true,
		overwriteExistingDescriptions: true,
		responseFuncPath: responseFuncPath,
	},
});
