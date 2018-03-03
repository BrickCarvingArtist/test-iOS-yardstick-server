import {
	createHash,
	createCipher,
	createDecipher
} from "crypto";
import {
	promisify
} from "util";
import {
	readFile as rf
} from "fs";
import {
	redisLogger
} from "../log";
/**
 * 函数式抛错
 * @param {*} err 错误信息
 */
export const throws = global.throws = err => {
	throw err;
};
/**
 * 格式化响应请求处理成功返回值
 * @param {*} data 响应给客户端的数据
 * @param {String} message 响应提示语句
 * @returns {Object} JSON格式对象
 */
export const success = global.success = (data, message = "获取数据成功！") => ({
	code: 0,
	data,
	message
});
/**
 * 格式化响应请求处理失败返回值
 * @param {UserInputError|ServerError} error 错误
 * @returns {Object} JSON格式对象
 */
export const error = global.error = ({
	code,
	message
}) => {
	return {
		code,
		message
	};
};
/**
 * 对象字面量化类
 * @param {Class} class 需要被对象字面量化的类
 * @returns {Object} 对象字面量化的类
 */
export const objectLiteral = ({prototype}) => Object.getOwnPropertyNames(prototype).slice(1).reduce((prev, curr) => {
	prev[curr] = prototype[curr];
	return prev;
}, {});
/**
 * 读取文件内容
 * @param {String} path 文件地址
 * @param {String} encoding 编码类型
 */
export const readFile = promisify(rf);
/**
 * md5编码
 * @param {String} str 需要被md5编码的字符串
 * @returns {String} 被md5编码的字符串
 */
export const md5 = str => {
	const md5 = createHash("md5");
	md5.update(str);
	return md5.digest("hex");
};
/**
 * @class DES加解密
 * @description 与移动端约定规则：使用3DES-ECB加解密
 */
@objectLiteral
class DESEncrypt{
	/**
	 * 生成加解密关键字
	 * 与移动端约定规则：先md5编码，再截取前24位，不足24位后补0
	 * @param {String} key 
	 * @returns {String} 加解密关键字
	 */
	generateCipherKey(key){
		return md5(key).slice(0, 24);
	}
	/**
	 * 加密
	 * @param {String} original 原始数据
	 * @param {String} key 加解密关键字
	 * @returns {String} 加密结果
	 */
	encrypt(original, key){
		const cipherKey = this.generateCipherKey(key);
		const cipher = createCipher("DES-EDE3", cipherKey);
		cipher.setAutoPadding(true);
		return Buffer.from(Buffer.concat([cipher.update(original, "utf8"), cipher.final()]).toString("hex")).toString("base64");
	}
	/**
	 * 解密
	 * @param {String} original 已加密数据
	 * @param {String} key 加解密关键字
	 * @returns {String} 解密结果
	 */
	decrypt(encrypted, key){
		const cipherKey = this.generateCipherKey(key);
		const decipher = createDecipher("DES-EDE3", cipherKey);
		decipher.setAutoPadding(true);
		return Buffer.concat([decipher.update(Buffer.from(encrypted, "base64").toString("utf8"), "hex"), decipher.final()]).toString("utf8");
	}
}
export {
	DESEncrypt
};