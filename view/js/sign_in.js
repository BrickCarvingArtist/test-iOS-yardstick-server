import {
	serialize,
	createPassiveEvent
} from "http://test.ikindness.cn/js/utils.js";
signIn.addEventListener("click", async _ => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch("http://test.ikindness.cn/signIn", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: serialize({
				tel: tel.value,
				password: password.value
			})
		})).json();
		alert(message);
		if(code || !data){
			return;
		}
		localStorage.tel = tel.value;
		location.href = "./home.html";
	}catch(e){
		alert("系统故障！");
	}
}, createPassiveEvent());