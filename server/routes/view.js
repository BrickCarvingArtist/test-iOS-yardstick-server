import {
	render
} from "./utils";
class View{
	@render("/", "/web.html")
	index(){
		return Promise.resolve();
	}
}
export default View;