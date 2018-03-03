import body from "koa-bodyparser";
import {
	equal
} from "assert";
// import multer from "koa-multer";
import router from "./router";
import {
	readFile
} from "../../utils";
import {
	join
} from "path";
import {
	isString
} from "lodash";
export const ENABLE_FORM = Symbol("ENABLE_FORM");
export const ENABLE_UPLOAD = Symbol("ENABLE_UPLOAD");
/**
 * api与路由联接器
 * @param {String} path http请求url
 * @param {String} method http请求方法
 * @param {Symbol} strategies http请求体处理策略
 * @returns {function} decorator挂件
 */
export const api = (path, method, ...strategies) => (target, name, descriptor) => {
	const args = [path];
	const data = {};
	if(strategies){
		~strategies.indexOf(ENABLE_FORM) && args.push(body());
		// ~strategies.indexOf(ENABLE_UPLOAD) && args.push(multer());
	}
	args.push(ctx => {
		try{
			const res = descriptor.value({}, Object.assign(ctx.query, ctx.params, ctx.request.body), {
				ctx
			});
			ctx.body = success(...(isString(res) ? [res] : res));
			ctx.status = 200;
		}catch(e){
			ctx.status = e.name === "UserInputError" ? 400 : 500;
			ctx.body = error(e);
		}
	});
	router[method.toLowerCase()](...args);
	return descriptor;
};
/**
 * html渲染器
 * @param {String} reqPath 请求路径
 * @param {String} filePath html文件路径
 * @returns {function} decorator挂件
 */
export const render = (reqPath, filePath) => (target, name, descriptor) => {
	router.get(reqPath, async ctx => {
		try{
			try{
				const html = await readFile(join(process.cwd(), "view", filePath), "utf8");
			// try{
				ctx.body = html//await descriptor.value();
			// }catch(e){
			// 	throws(new ServerError(50001));
			// 	ctx.body = "系统故障";
			// 	ctx.status = 500;
			// }
			}catch(e){
				throws(new ServerError(50001));
			}
		}catch(e){
			ctx.body = "系统故障";
			ctx.status = 500;
		}
	});
	return descriptor;
};
/**
 * 参数格式合法性校验器
 * @module resolvers/validation
 * @param {Object} options 将要进行检验的配置
 * @param {Object|Object[]} options.name 一条或一组将要校验的参数规则键值对
 * @example
 * options.user表示校验参数user
 * @param {Function|RegExp} options.name.validator 用作校验的规则
 * @example
 * 校验user参数的值长度是否大于2
 * options.user.validator = user => user.length > 2;
 * @example
 * 校验user参数的值是否是由2个及以上的非空字符组成
 * options.user.validator = /^\S{2,}$/ 
 * @param {String} options.name.comment 校验不通过时的错误提示
 * @example
 * options.user.comment = "miaomiaomiao"表示校验不通过时，context.comment的值为miaomiaomiao
 * @returns {function} decorator挂件
 */
export default function validation(options){
	equal(({})::toString(options), "[object Object]", "校验配置需要是一个对象！");
	return (target, name, descriptor, {value} = descriptor) => {
		descriptor.value = (_, args, context) => {
			for(const injection in options){
				let rules = options[injection];
				const isArray = Array.isArray(rules);
				const isObject = ({})::toString(rules) === "[object Object]";
				equal(isArray || isObject, true, "校验规则需要是对象或数组！");
				rules = [[rules], rules][+isArray];
				for(const {validator, comment} of rules){
					const isFunction = typeof validator === "function";
					const isRegExp = validator instanceof RegExp;
					equal(isFunction || isRegExp, true, "校验器需要是函数或正则类型！");
					isFunction && validator(args[injection]) || validator.test(args[injection]) || throws(new UserInputError(comment));
					return value(_, args, context);
				}
			}
		};
		return descriptor;
	};
}