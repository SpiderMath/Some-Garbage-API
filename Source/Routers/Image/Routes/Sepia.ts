import RouteExport from "../../../Constants/RouteExport";
import { read } from "jimp";

const SepiaRoute: RouteExport = {
	name: "sepia",
	description: "Applies the Sepia filter to an Image",
	async run(req, res) {
		const imageURL = req.query.image;

		if(!imageURL) {
			return res
				.status(400)
				.json({
					error: "Image URL not provided",
				});
		}

		try {
			// @ts-ignore
			const image = await read(imageURL);

			image.sepia();

			res
				.set({ "Content-Type": "image/png" })
				.status(200)
				.send(await image.getBufferAsync("image/png"));
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

export default SepiaRoute;