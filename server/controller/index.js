import serve from "koa-static";
import {
	join
} from "path";
import routes from "../routes";
export default app => {
	app
		.use(serve(join(process.cwd(), "view"), {
			setHeaders(res){
				res.setHeader("Access-Control-Allow-Origin", "*");
			}
		}))
		.use(routes());
	return {
		listen(port){
			app.listen(port);
			trace(`Server started at ${port}.`);
		}
	};
};
