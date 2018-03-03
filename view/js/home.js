import {
	serialize
} from "http://test.ikindness.cn/js/utils.js";
async function getProducts(){
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`http://test.ikindness.cn/getProducts?${serialize({
			cityCode: 1
		})}`)).json();
		alert(message);
		if(code || !data){
			return;
		}
		products.innerHTML = data.reduce((prev, curr, index, arr, {
			id,
			name,
			price
		} = data[index]) => `
			${prev}
			<a class="product" href="./detail.html?id=${id}">
				<strong>${name}</strong>
				<span>¥${price}</span>
			</a>
		`, "");
	}catch(e){
		alert("系统故障！");
	}
}
getProducts();