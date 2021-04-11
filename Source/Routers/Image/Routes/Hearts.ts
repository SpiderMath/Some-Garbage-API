import RouteExport from "../../../Constants/RouteExport";
import { createCanvas, loadImage } from "canvas";
import { join } from "path";
import drawImageWithTint from "../../../Helpers/Canvas/drawImageWithTint";

const HeartsRoute: RouteExport = {
	name: "hearts",
	description: "Draws the Image with hearts on it. Love is in the Air!",
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

		const base = await loadImage(join(__dirname, "../../../../Assets/Images/hearts.png"));

		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext("2d");

		drawImageWithTint(ctx, image, "deeppink", 0, 0, canvas.width, canvas.height);

		ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

		res
			.status(400)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());
	},
};

export default HeartsRoute;