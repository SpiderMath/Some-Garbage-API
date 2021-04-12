import RouteExport from "../../../Constants/RouteExport";
import { join } from "path";
import { loadImage, createCanvas } from "canvas";

const BeautifulRoute: RouteExport = {
	name: "beautiful",
	description: "'Oh this? This is beautiful' meme from The Gravity Falls",
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

		const base = await loadImage(join(__dirname, "../../../../Assets/Images/beautiful.png"));

		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext("2d");

		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, base.width, base.height);

		ctx.drawImage(base, 0, 0);

		ctx.drawImage(image, 249, 24, 105, 105);
		ctx.drawImage(image, 249, 223, 105, 105);

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());
	},
};

export default BeautifulRoute;