import RouteExport from "../../../Constants/RouteExport";
import { read } from "jimp";

const BrightnessRoute: RouteExport = {
	name: "brightness",
	description: "Changes the brightness of an Image according to the quotient",
	async run(req, res) {
		const imageURL = req.query.image;
		let value = req.query.brightness;

		// @ts-ignore
		value = Number(value);

		if(!imageURL) {
			return res
				.status(400)
				.json({
					error: "Image URL not provided",
				});
		}

		if(value === null) {
			return res
				.status(400)
				.json({
					error: "Value not provided or the value is not a number",
				});
		}

		// @ts-ignore
		if(Math.abs(value) > 1) {
			return res
				.status(400)
				.json({
					error: "Out of Range. Range of brightness quotient has to be between 1 and -1",
				});
		}

		let image;

		try {
		// @ts-ignore
			image = await read(imageURL);
		}
		catch(err) {
			return res
				.status(400)
				.json({
					error: "Failed to load Image",
				});
		}

		// @ts-ignore
		image.brightness(value);

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(await image.getBufferAsync("image/png"));
	},
};

export default BrightnessRoute;