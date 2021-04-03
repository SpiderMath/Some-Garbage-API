import { Router } from "express";
import { loadImage, createCanvas } from "canvas";
import { join } from "path";
import { read } from "jimp";

const ImageRouter = Router();

ImageRouter.get("/rainbow", async (req, res) => {
	const imageURL = req.query.image;

	if(!imageURL) {
		res
			.status(400)
			.json({
				error: "Image URL not provided",
			});
	}

	try {
		// @ts-ignore
		const image = await loadImage(imageURL);
		// @ts-ignore
		const filter = await loadImage(join(__dirname, "../../Assets/Images/rainbow.png"));

		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(filter, 0, 0, canvas.width, canvas.height);

		res
			.set({ "Content-Type": "image/png" })
			.status(200)
			.send(canvas.toBuffer());
	}
	catch(err) {
		return res
			.status(400)
			.json({
				error: "Failed to load this image",
			});
	}
});

ImageRouter.get("/greyscale", async (req, res) => {
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

		image.greyscale();

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
});

ImageRouter.get("/invert", async (req, res) => {
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

		image.invert();

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
});

ImageRouter.get("/sepia", async (req, res) => {
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
});

ImageRouter.get("/circle", async (req, res) => {
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

		image.circle();

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
});

ImageRouter.get("/pixelate", async (req, res) => {
	const imageURL = req.query.image;
	const value: any = req.query.value;

	if(!imageURL) {
		return res
			.status(400)
			.json({
				error: "Image URL not provided",
			});
	}

	if(!value) {
		return res
			.status(400)
			.json({
				error: "Value for pixelation not provided",
			});
	}

	try {
		// @ts-ignore
		const image = await read(imageURL);

		// @ts-ignore
		image.pixelate(Number(value) || 10);

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
});

export default ImageRouter;