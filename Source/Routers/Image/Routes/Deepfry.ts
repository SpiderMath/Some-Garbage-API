import RouteExport from "../../../Constants/RouteExport";
import { loadImage, createCanvas } from "canvas";
import desaturate from "../../../Helpers/Canvas/desaturate";
import contrast from "../../../Helpers/Canvas/contrast";

const DeepfryRoute: RouteExport = {
	name: "deepfry",
	description: "Deeply fries the image",
	async run(req, res) {
		const imageURL = req.query.image;

		if(!imageURL) {
			return res
				.status(400)
				.json({
					error: "Image URL not provided",
				});
		}

		let image;

		try {
			// @ts-ignore
			image = await loadImage(imageURL);
		}
		catch(err) {
			return res
				.status(400)
				.json({
					error: "Failed to load Image",
				});
		}

		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

		desaturate(ctx, -20, 0, 0, canvas.width, canvas.height);
		contrast(ctx, 0, 0, canvas.width, canvas.height);

		res
			.status(200)
			.set({ "Content-Type": "image/jpeg" })
			.send(canvas.toBuffer("image/jpeg", { quality: 0.2 }));
	},
};

export default DeepfryRoute;