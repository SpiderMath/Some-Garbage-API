import RouteExport from "../../../Constants/RouteExport";
import { loadImage, createCanvas } from "canvas";

const RainbowRoute: RouteExport = {
	name: "rainbow",
	description: "Applies the Rainbow filter on an Image",
	async run(req, res) {
		const imageURL = req.query.image;

		if(!imageURL) {
			res
				.status(400)
				.json({
					error: "Image URL not provided",
				});
		}

		try {
			// @ts-ignore
			const image = await loadImage(imageURL);
			// @ts-ignore
			const filter = await loadImage(join(__dirname, "../../Assets/Images/rainbow.png"));

			const canvas = createCanvas(image.width, image.height);
			const ctx = canvas.getContext("2d");

			ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(filter, 0, 0, canvas.width, canvas.height);

			res
				.set({ "Content-Type": "image/png" })
				.status(200)
				.send(canvas.toBuffer());
		}
		catch(err) {
			return res
				.status(400)
				.json({
					error: "Failed to load this image",
				});
		}

	},
};

export default RainbowRoute;