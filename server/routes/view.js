import {
	render
} from "./utils";
class View{
	@render("/signIn", "/sign_in.html")
	signIn(){
		return Promise.resolve();
	}
}
export default View;