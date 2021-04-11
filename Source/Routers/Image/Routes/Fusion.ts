import RouteExport from "../../../Constants/RouteExport";
import { createCanvas, loadImage } from "canvas";

const FusionRoute: RouteExport = {
	name: "fusion",
	description: "Fuses two images together",
	async run(req, res) {
		const baseURL = req.query.base;
		const overlayURL = req.query.overlay;

		if(!baseURL) {
			return res
				.status(400)
				.json({
					error: "Base URL not provided",
				});
		}

		if(!overlayURL) {
			return res
				.status(400)
				.json({
					error: "Overlay URL not provided",
				});
		}

		let base, overlay;

		try {
			// @ts-ignore
			base = await loadImage(baseURL);
			// @ts-ignore
			overlay = await loadImage(overlayURL);
		}
		catch(err) {
			return res
				.status(400)
				.json({
					error: "Images could not be loaded",
				});
		}

		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext("2d");

		ctx.globalAlpha = 0.5;

		ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

		ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());
	},
};

export default FusionRoute;