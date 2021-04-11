import RouteExport from "../../../Constants/RouteExport";
import { createCanvas, loadImage } from "canvas";

const WideImageRoute: RouteExport = {
	name: "wide-image",
	description: "Returns image with the Wide-Putin meme applied. You'll get what I mean after using",
	async run(req, res) {
		const imageURL = req.query.image;
		const ratio = Number(req.query.ratio) || 2;

		if(!imageURL) {
			return res
				.status(400)
				.json({
					error: "Image URL not provided",
				});
		}

		if(ratio > 10 || ratio <= 0.01) {
			return res
				.status(400)
				.json({
					error: "RANGE_ERROR. Range exceeded, ratio has to be between 0.01 and 10",
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
					error: "Failed to load the image",
				});
		}

		const canvas = createCanvas(image.width * ratio, image.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());

	},
};

export default WideImageRoute;