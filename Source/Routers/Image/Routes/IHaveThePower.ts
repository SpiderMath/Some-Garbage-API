import RouteExport from "../../../Constants/RouteExport";
import { loadImage, createCanvas } from "canvas";
import { join } from "path";

const IHaveThePowerRoute: RouteExport = {
	name: "i-have-the-power",
	description: "Puts the image on the face of 'He Man' I have the Power",
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
				.	status(400)
				.json({
					error: "Failed to load Image",
				});
		}

		const base = await loadImage(join(__dirname, "../../Assets/Images/i-have-the-power.png"));

		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(base, 0, 0, base.width, base.height);

		ctx.rotate(18.3 * (Math.PI / 180));

		ctx.drawImage(image, 332, -125, 175, 175);

		ctx.rotate(-18.3 * (Math.PI / 180));

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());
	},
};

export default IHaveThePowerRoute;