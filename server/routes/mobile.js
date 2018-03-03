import {
	api,
	ENABLE_FORM
} from "./utils";
import {
	DESEncrypt
} from "../../utils";
class Mobile{
	@api("/encrypt", "GET")
	encrypt(_, args, {ctx}){
		// const data = '{"client":1,"screenSize":3,"brand":"Xiaomi","sys_type":"android","model":"Mi Note 3","sys_version":"7.1.1","gis":"4.9E-324:4.9E-324:0","udid":"01519720666130","registrationID":"","userName":"18758285734","userPwd":"ryujjk"}';
		const data = args.source;
		const password = "12345678";
		return DESEncrypt.encrypt(data, password);
	}
	@api("/decrypt", "GET")
	decrypt(_, args, {ctx}){
		// const encrypted = "yo3YS1k70qqii3DiADok/aM+mJ2bYbjd9h/SefxB2ayX9cIalh7l/Fwt1jKwSap36sEHjUfqkU0eDsCs/xAlumRJrGhcgD6OfT38ReEDxtRcgueSTUE75SfWY2blF2YoBRdgkiPyb0QHIJfrFm47YlBWy3hB8UbtfkZIxjhVpgRbSxtm23kVkbnl3AIgMpIhYza8l0IIruRArm2Orsm8SOauyeA6L6wm8rH9IIC5coneD7nUhKTf2GntbDZyFPAuLXON4ZhjgyPFoMuk5P4HQWK3ptnk2egorti5spzOvtI=";
		const encrypted = args.encrypt;
		const password = "12345678";
		return DESEncrypt.decrypt(encrypted, password);
	}
}
export default Mobile;