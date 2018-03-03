import Router from "koa-router";
const router = new Router;
export default router
	.use((ctx, next) => {
		ctx.set("Access-Control-Allow-Origin", "*");
		return next();
	});