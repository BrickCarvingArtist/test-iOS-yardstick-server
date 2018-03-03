import {
	api,
	ENABLE_FORM
} from "./utils";
import {
	randomBytes
} from "crypto";
class TestMobile{
	@api("/signIn", "POST", ENABLE_FORM)
	signIn(_, {
		tel,
		password
	}, {
		ctx
	}){
		if(tel === "13123456789" && password === "123456"){
			ctx.cookies.set("user", tel, {
				maxAge: 1000 * 60 * 60 * 6
			});
			return [true, "登录成功！"];
		}
		throws(new UserInputError(4000));
	}
	@api("/signOut", "POST", ENABLE_FORM)
	signOut(_, args, {
		ctx
	}){
		ctx.cookies.set("tel", "", {
			maxAge: 0
		});
		return [true, "注销成功！"];
	}
	@api("/userInfo", "GET")
	getUserInfo(_, args, {
		ctx
	}){
		if(ctx.cookies.get("tel") === "13123456789" || args.tel === "13123456789"){
			return [
				{
					name: "迷之用户",
					tel: "13123456789",
					money: 10000
				},
				"获取用户基本信息成功！"
			];
		}
		throws(new UserInputError(4001));
	}
	@api("/getProducts", "GET")
	getProducts(_, {
		cityCode
	}){
		if(cityCode in new Int8Array(2)){
			return [
				Array(100).fill(1).map((item, index) => ({
					id: index,
					name: `商品${randomBytes(10).toString("hex")}`,
					price: (Math.random() * 1000).toFixed(2)
				})),
				"获取商品列表成功！"
			];
		}
		throws(new UserInputError(4002));
	}
	@api("/getProductDetail", "GET")
	getProductDetail(_, {
		id
	}){
		return [
			{
				id,
				name: `商品${randomBytes(10).toString("hex")}`,
				price: (Math.random() * 1000).toFixed(2)
			},
			"获取商品详情成功！"
		];
	}
	@api("/buy", "GET")
	buy(_, {
		id,
		tel
	}){
		if(tel === "13123456789"){
			return [true, "订购成功！"];
		}
		throws(new UserInputError(4003));
	}
}