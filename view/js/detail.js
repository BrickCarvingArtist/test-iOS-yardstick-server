import {
	serialize,
	createPassiveEvent
} from "http://test.ikindness.cn/js/utils.js";
back.addEventListener("click", history.back.bind(history), createPassiveEvent());
async function getProductDetail(){
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`http://localhost:12321/getProductDetail${location.search}`)).json();
		alert(message);
		if(code || !data){
			return;
		}
		product.textContent = data.name;
		price.textContent = `¥${data.price}`;
	}catch(e){
		alert("系统故障！");
	}
}
getProductDetail();
buy.addEventListener("click", async _ => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`http://localhost:12321/buy${location.search})}&tel=${localStorage.tel || 13000000000}`)).json();
		alert(message);
		if(code || !data){
			return;
		}
		location.href = "./index.html";
	}catch(e){
		alert("系统故障！");
	}
}, createPassiveEvent());