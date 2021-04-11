import RouteExport from "../../../Constants/RouteExport";
import { loadImage, createCanvas, registerFont } from "canvas";
import { join } from "path";
import greyscale from "../../../Helpers/Canvas/greyscale";

registerFont(join(__dirname, "../../../../Assets/Fonts/CoffinStone.otf"), {
	family: "Coffin Stone",
});

const RIPRoute: RouteExport = {
	name: "rip",
	description: "Makes the Coffinstone of a User",
	async run(req, res) {
		const imageURL = req.query.image;
		const username = req.query.username;

		if(!imageURL) {
			return res
				.status(400)
				.json({
					error: "Image URL not provided",
				});
		}

		if(!username) {
			return res
				.status(400)
				.json({
					error: "Username not provided",
				});
		}

		// @ts-ignore
		if(req.query.cause && req.query.cause.length > 47) {
			return res
				.status(400)
				.json({
					error: "Cause length cannot be more than 47",
				});
		}
		// @ts-ignore
		if(username.length > 20) {
			return res
				.status(400)
				.json({
					error: "Username length cannot be more than 20",
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
					error: "Failed to load the image",
				});
		}

		const base = await loadImage(join(__dirname, "../../Assets/Images/rip.png"));

		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext("2d");

		// First base
		ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

		// Then input image
		ctx.drawImage(image, 194, 399, 500, 500);

		// Then greyscale the image provided
		greyscale(ctx, 194, 399, 500, 500);

		// Basic Font Configuration
		ctx.textBaseline = "top";
		ctx.textAlign = "center";
		ctx.font = "62px Coffin Stone";

		// Writing Username
		ctx.fillStyle = "black";
		// @ts-ignore
		ctx.fillText(username, 438, 330, 500);

		// Writing 'in loving memory of' and the cause(optional)
		ctx.fillStyle = "white";

		if(req.query.cause) ctx.fillText(String(req.query.cause), 438, 910, 500);

		ctx.font = "37px Coffin Stone";
		ctx.fillText("In Loving Memory of", 438, 292);

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());
	},
};

export default RIPRoute;
