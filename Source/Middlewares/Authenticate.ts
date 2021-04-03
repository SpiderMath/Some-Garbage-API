import { Request, Response } from "express";
import { join } from "path";

export default async function Authenticate(req: Request, res: Response, next: Function) {
	const RequestURL = req.originalUrl;

	if(RequestURL === "/" || RequestURL === "/favicon.ico") return;

	if(!RequestURL.startsWith("/api")) return console.log("e");

	const token = req.query.token;

	if(!token) {
		return res.json({
			error: "No token provided. You need a Token in your parameter",
		});
	}

	const data: string[] = (await import(join(__dirname, "../Helpers/GetCount.ts"))).default;

	const bool = data.includes(String(token));

	if(!bool) {
		return res.json({
			error: "Invalid token provided",
		});
	}

	next();
};