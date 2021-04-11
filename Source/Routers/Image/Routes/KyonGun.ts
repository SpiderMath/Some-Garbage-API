import RouteExport from "../../../Constants/RouteExport";
import { loadImage, createCanvas } from "canvas";
import { join } from "path";

const KyonGunRoute: RouteExport = {
	name: "kyon-gun",
	description: "Draws an image behind Kyon (Endless Eight) shooting a gun",
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

		const base = await loadImage(join(__dirname, "../../Assets/Images/kyon-gun.png"));

		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());
	},
};

export default KyonGunRoute;