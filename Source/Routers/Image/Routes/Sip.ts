import RouteExport from "../../../Constants/RouteExport";
import { createCanvas, loadImage } from "canvas";
import { join } from "path";

const SipRoute: RouteExport = {
	name: "sip",
	description: "Lets a user sip some hot drinks",
	async run(req, res) {
		const imageURL = req.query.image;
		let direction = String(req.query.direction);

		const directions = ["left", "right"];

		if(direction === undefined) direction = "left";

		if(!directions.includes(direction.toLowerCase())) {
			return res
				.status(400)
				.json({
					error: "Invalid direction provided. The valid options are: right & left",
				});
		}

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

		const base = await loadImage(join(__dirname, `../../../../Assets/Images/sip-${direction.toLowerCase()}.png`));

		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext("2d");

		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.drawImage(image, 0, 0, 512, 512);

		ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());

	},
};

export default SipRoute;