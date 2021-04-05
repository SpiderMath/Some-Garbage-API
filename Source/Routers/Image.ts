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

ImageRouter.get("/gun", async (req, res) => {
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

	const base = await loadImage(join(__dirname, "../../Assets/Images/gun.png"));
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
});

ImageRouter.get("/png-to-jpeg", async (req, res) => {
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
		const image = await loadImage(imageURL);

		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0, image.width, image.height);

		res
			.status(200)
			.set({ "Content-Type": "image/jpeg" })
			.send(canvas.toBuffer("image/jpeg"));
	}
	catch(err) {
		return res
			.status(400)
			.json({
				error: "Failed to load this image",
			});
	}
});

ImageRouter.get("/chocolate-milk", async (req, res) => {
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
		const image = await loadImage(imageURL);
		const base = await loadImage(join(__dirname, "../../Assets/Images/chocolate-milk.png"));

		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext("2d");

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

		res
			.status(200)
			.set({ "Content-Type": "image/png" })
			.send(canvas.toBuffer());
	}
	catch(err) {
		return res
			.status(400)
			.json({
				error: "Failed to load Image",
			});
	}
});

ImageRouter.get("/brightness", async (req, res) => {
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
		console.log(err.message);
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
});

ImageRouter.get("/fusion", async (req, res) => {
	const baseURL = req.query.base;
	const overlayURL = req.query.overlay;

	if(!baseURL) {
		return res
			.status(400)
			.json({
				error: "Base URL not provided",
			});
	}

	if(!overlayURL) {
		return res
			.status(400)
			.json({
				error: "Overlay URL not provided",
			});
	}

	let base, overlay;

	try {
		// @ts-ignore
		base = await loadImage(baseURL);
		// @ts-ignore
		overlay = await loadImage(overlayURL);
	}
	catch(err) {
		return res
			.status(400)
			.json({
				error: "Images could not be loaded",
			});
	}

	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext("2d");

	ctx.globalAlpha = 0.5;

	ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

	ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

	res
		.status(200)
		.set({ "Content-Type": "image/png" })
		.send(canvas.toBuffer());
});

ImageRouter.get("/wide-image", async (req, res) => {
	const imageURL = req.query.image;
	const ratio = Number(req.query.ratio) || 2;

	if(!imageURL) {
		return res
			.status(400)
			.json({
				error: "Image URL not provided",
			});
	}

	if(ratio > 10 || ratio <= 0.01) {
		return res
			.status(400)
			.json({
				error: "RANGE_ERROR. Range exceeded, ratio has to be between 0.01 and 10",
			});
	}

	let image;
	try {
		// @ts-ignore
		image = await loadImage(imageURL);
	}
	catch(err) {
		console.log(err.message);
		return res
			.status(400)
			.json({
				error: "Failed to load the image",
			});
	}

	const canvas = createCanvas(image.width * ratio, image.height);
	const ctx = canvas.getContext("2d");

	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	res
		.status(200)
		.set({ "Content-Type": "image/png" })
		.send(canvas.toBuffer());
});

export default ImageRouter;