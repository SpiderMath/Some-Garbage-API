import { Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";
import RouterExport from "../../Constants/RouteExport";
import Logger from "../../Helpers/Logger";

const ImageRouter = Router();

readdirSync(join(__dirname, "Routes"))
	.forEach(async route => {
		const pull = await import(join(__dirname, `./Routes/${route}`));

		const deal: RouterExport = pull.default;

		// @ts-ignore
		ImageRouter.get(`/${deal.name.toLowerCase()}`, deal.run);

		Logger.info("server/image", `Listening for ${deal.name.toLowerCase()}`);
	});

export default ImageRouter;