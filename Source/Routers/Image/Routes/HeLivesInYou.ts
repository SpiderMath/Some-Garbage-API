import RouteExport from "../../../Constants/RouteExport";
import { loadImage, createCanvas } from "canvas";
import drawImageWithTint from "../../../Helpers/Canvas/drawImageWithTint";
import { join } from "path";

const HeLivesInYouRoute: RouteExport = {
	name: "he-lives-in-you",
	description: "Puts an Image as the reflection of Simba from 'The Lion King'",
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

		const base = await loadImage(join(__dirname, "../../Assets/Images/he-lives-in-you.png"));

		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

		ctx.rotate(-24 * (Math.PI / 180));

		drawImageWithTint(ctx, image, "#00115d", 75, 160, 130, 150);

		ctx.rotate(24 * (Math.PI / 180));

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());
	},
};

export default HeLivesInYouRoute;