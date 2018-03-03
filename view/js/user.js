import {
	serialize,
	createPassiveEvent
} from "http://test.ikindness.cn/js/utils.js";
async function getUserInfo(){
	const {
		code,
		data,
		message
	} = await (await fetch(`http://test.ikindness.cn/userInfo?tel=${localStorage.tel || 13000000000}`)).json();
	if(code || !data){
		return alert(message);
	}
	user.textContent = data.name;
	tel.textContent = data.tel;
	money.textContent = `¥${data.money.toFixed(2)}`;
}
getUserInfo();
signOut.addEventListener("click", async _ => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch("http://test.ikindness.cn/signOut", {
			method: "POST"
		})).json();
		alert(message);
		if(code || !data){
			return location.href = "./sign_in.html";
		}
		localStorage.removeItem("tel");
		location.href = "./sign_in.html";
	}catch(e){
		alert("系统故障！");
	}
}, createPassiveEvent());