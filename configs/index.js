module.exports = (env => ({
	development: {
		SERVER: {
			host: "127.0.0.1",
			port: "12321"
		},
		REDIS: {
			host: "127.0.0.1",
			port: "6379"
		}
	},
	test: {},
	test1: {},
	pre: {},
	product: {}
}[env]))(process.env.NODE_ENV);