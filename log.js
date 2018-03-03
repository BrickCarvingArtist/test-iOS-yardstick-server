import log4js from "log4js";
import {
	REDIS
} from "./configs";
const {
	host,
	port
} = REDIS;
log4js.configure({
	appenders: {
		redis: {
			type: "redis",
			host,
			port,
			channel: "logs"
		},
		log: {
			type: "stdout"
		}
	},
	categories: {
		// 必须保留，否则报错：must define a "default" category
		default: {
			appenders: ["log"],
			level: "TRACE"
		},
		console: {
			appenders: ["log"],
			level: "TRACE"
		},
		redis: {
			appenders: ["redis", "log"],
			level: "INFO"
		}
	}
});
export const consoleLogger = log4js.getLogger("console");
export const redisLogger = log4js.getLogger("redis");
Object.assign(global, {
	trace: ::consoleLogger.trace,
	debug: ::consoleLogger.debug,
	info: ::redisLogger.info,
	warn: ::redisLogger.warn,
	fatal: ::redisLogger.fatal
});