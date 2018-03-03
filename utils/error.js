import ErrorCode from "./errorCode";
/**
 * @class 错误
 */
class BaseError extends Error{
	constructor(code){
		super(ErrorCode[code]);
		this.code = code;
		this.name = "BaseError";
		Error.captureStackTrace(this, this.constructor);
	}
}
/**
 * @todo 写入用户行为记录
 */
class UserInputError extends BaseError{
	constructor(code){
		super(code);
		this.name = "UserInputError";
	}
	log(code){
		redisLogger.error(code);
	}
}
global.UserInputError = UserInputError;
/**
 * @todo 写入系统异常记录
 */
class ServerError extends BaseError{
	constructor(code){
		super(code);
		this.name = "ServerError";
	}
	log(code){
		redisLogger.error(code);
	}
};
global.ServerError = ServerError;