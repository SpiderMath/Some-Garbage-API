import { Router } from "express";
import { loadImage, createCanvas } from "canvas";
import { join } from "path";

const ImageRouter = Router();

// Importing helpers
import desaturate from "../Helpers/Canvas/desaturate";
import contrast from "../Helpers/Canvas/contrast";
import centerImagePart from "../Helpers/Canvas/centerImagePart";

// legend: left 70, right 228, top 50, bottom 210

// All routes belong here
ImageRouter.get("/deepfry", async (req, res) => {
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

	const canvas = createCanvas(image.width, image.height);
	const ctx = canvas.getContext("2d");

	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	desaturate(ctx, -20, 0, 0, canvas.width, canvas.height);
	contrast(ctx, 0, 0, canvas.width, canvas.height);

	res
		.status(200)
		.set({ "Content-Type": "image/jpeg" })
		.send(canvas.toBuffer("image/jpeg", { quality: 0.2 }));
});

ImageRouter.get("/beautiful", async (req, res) => {
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

	const base = await loadImage(join(__dirname, "../../Assets/Images/beautiful.png"));

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
});

ImageRouter.get("/mulan-ling", async (req, res) => {
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

	const base = await loadImage(join(__dirname, "../../Assets/Images/girl-worth-fighting-for.png"));

	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext("2d");

	ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
	const { x, y, width, height } = centerImagePart(image, 150, 150, 380, 511);

	ctx.drawImage(image, x, y, width, height);

	res
		.status(200)
		.set({ "Content-Type": "image/png" })
		.send(canvas.toBuffer());
});

export default ImageRouter;