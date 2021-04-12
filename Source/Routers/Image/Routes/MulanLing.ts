import RouteExport from "../../../Constants/RouteExport";
import { loadImage, createCanvas } from "canvas";
import { join } from "path";
import centerImagePart from "../../../Helpers/Canvas/centerImagePart";

const MulanLingRoute: RouteExport = {
	name: "mulan-ling",
	description: "Well, puts the image to be the girl worth fighting for",
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

		const base = await loadImage(join(__dirname, "../../../../Assets/Images/girl-worth-fighting-for.png"));

		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
		const { x, y, width, height } = centerImagePart(image, 150, 150, 380, 511);

		ctx.drawImage(image, x, y, width, height);

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());
	},
};

export default MulanLingRoute;