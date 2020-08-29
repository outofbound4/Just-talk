/**
 * config
 */

var config = {
	debug: true,
	port: 3000,
	mysql: {
		host: '127.0.0.1',
		username: 'YOUR MySQL DATABASE USERNAME',
		password: 'DATABASE PASSWORD',
		database: 'DATABASE NAME'
	},
	mongodb: {
		host: '127.0.0.1',
		username: 'YOUR Mongodb DATABASE USERNAME',
		password: 'DATABASE PASSWORD',
		database: 'DATABASE NAME'
	},
}

module.exports = config