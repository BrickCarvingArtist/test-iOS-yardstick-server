import "../log";
import "../utils/error";
import controls from "./controller";
import Koa from "koa";
import {
	SERVER
} from "../configs";
controls(new Koa).listen(SERVER.port);