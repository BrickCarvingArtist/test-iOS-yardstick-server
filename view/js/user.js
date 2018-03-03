import {
	serialize,
	createPassiveEvent
} from "http://localhost:12321/js/utils.js";
async function getUserInfo(){
	const {
		code,
		data,
		message
	} = await (await fetch(`http://localhost:12321/userInfo?tel=${localStorage.tel || 13000000000}`)).json();
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
			return;
		}
		localStorage.removeItem("tel");
		location.href = "./index.html";
	}catch(e){
		alert("系统故障！");
	}
}, createPassiveEvent());