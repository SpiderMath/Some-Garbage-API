import RouteExport from "../../../Constants/RouteExport";
import { createCanvas, loadImage } from "canvas";
import { join } from "path";

const GunRoute: RouteExport = {
	name: "gun",
	description: "You know the Rules so do I. Now say Goodbye. (Just a Joke) Gives a gun to the image",
	async run(req, res) {
		const imageURL = req.query.image;

		if(!imageURL) {
			return res
				.status(400)
				.json({
					error: "Image URL not provided",
				});
		}

		let img;

		try {
			// @ts-ignore
			img = await loadImage(imageURL);
		}
		catch(err) {
			return res
				.status(400)
				.json({
					error: "Failed to load this image",
				});
		}

		const base = await loadImage(join(__dirname, "../../../../Assets/Images/gun.png"));
		const canvas = createCanvas(img.width, img.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		const ratio = (img.height / 2) / base.height;

		const width = base.width * ratio;

		ctx.drawImage(base, img.width - width, img.height - (img.height / 2), width, img.height / 2);

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());
	},
};

export default GunRoute;