
var mockServer = require('./../mock-server.js');
var dest = __dirname + '/rest';
var replacePathsStr = '/v2/{baseSiteId}';
var responseFuncPath = __dirname + 'func-imported';
var log = require('chip')();

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
		'/rest/products/#{productCode}/GET'(serverOptions, requestOptions) {
			var productCode = requestOptions.req.params[0].split('/')[1];
			log.info('Yael: middleware run.');
            log.info('\trequestOptions.req.params[0] = ' + requestOptions.req.params[0]);
            log.info('\tproductCode = ' + productCode);
			if (productCode === '1234') {
				requestOptions.res.statusCode = 201;
				requestOptions.res.end('product 1234');
				return null;
			}

			return 'success';
		},
		'/rest/#{p}/#{productCode}/GET'(serverOptions, requestOptions) {
            log.info('Yael: middleware run.');
            log.info('\trequestOptions.req.params[0] = ' + requestOptions.req.params[0]);
            var productCode = requestOptions.req.params[0].split('/')[1];
            log.info('\tproductCode = ' + productCode);

            if (productCode === '1234') {
                requestOptions.res.statusCode = 204;
                requestOptions.res.end('product 1234');
                return null;
            }

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
