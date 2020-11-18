/**
 * config
 */

var config = {
	debug: true,
	HOST: '127.0.0.1',
	PORT: 3000,


	SESSION_NAME: 'sidftft',
	SESSION_SECRET: 'keep it secret!',
	SESSION_LIFETIME: 60000,

	MySQL: {
		USER_NAME: 'root',
		DB_PASSWORD: 'root',
		DATABASE_NAME: 'JustTalk'
	},
	MongoDB: {
		MongoDB_URL: 'mongodb://127.0.0.1:27017/',
		USER_NAME: '',
		DB_PASSWORD: '',
		DATABASE_NAME: 'JustTalk'
	},

	EMAIL: {
		ADMIN_EMAIL: 'Your email to send email confirmation link',
		EMAIL_PASSWORD: 'Email password',
	}
}

module.exports = config