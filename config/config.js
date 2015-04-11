'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/..')

	module.exports = {
		root: rootPath,
		pm2servers: [
			{
				host:'gumabae.iptime.org',
				username:'guma'
			},
			{
				host: '127.0.0.1',
				username:'cabox',
			},
			{
				host: '192.168.0.28',
				username: 'guma'
			}, {
				host: '192.168.0.28',
				username: 'guma'
			}
		],
		prvKeyPath: '/home/cabox/.ssh/id_rsa',
		// database: {
		//   server: '',
		//   database: '',
		//   user: '',
		//   password: ''
		// }
		redis: {
			host: '192.168.0.28',
			port: 6379
		},
		webServer: {
			port: 11111,
			ip: '0.0.0.0'
		}
	};