/**
 * 将JSON格式对象序列化为url查询
 * @param {Object} data 要被序列化为url查询的JSON格式对象
 * @returns {String} 被序列化为url查询的JSON格式对象
 */
export const serialize = data => Reflect.ownKeys(data).reduce((prev, curr) => `${prev}&${curr}=${data[curr]}`, "").slice(1);
/**
 * 创建被动的监听器
 * @param {*} _ 无关紧要随意传 
 * @returns {Object} 被动监听器配置
 */
export const createPassiveEvent = _ => ({
	passive: true
});