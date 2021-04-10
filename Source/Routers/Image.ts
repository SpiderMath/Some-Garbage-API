import { Router } from "express";
import { loadImage, createCanvas, registerFont } from "canvas";
import { join } from "path";
import { read } from "jimp";

const ImageRouter = Router();

// Importing helpers
import drawImageWithTint from "../Helpers/Canvas/drawImageWithTint";
import greyscale from "../Helpers/Canvas/greyscale";
import desaturate from "../Helpers/Canvas/desaturate";
import contrast from "../Helpers/Canvas/contrast";
import centerImagePart from "../Helpers/Canvas/centerImagePart";

// Registration of Fonts
registerFont(join(__dirname, "../../Assets/Fonts/CoffinStone.otf"), {
	family: "Coffin Stone",
});

// legend: left 70, right 228, top 50, bottom 210

// All routes belong here

ImageRouter.get("/chocolate-milk", async (req, res) => {
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

	try {
		// @ts-ignore
		const image = await loadImage(imageURL);
		const base = await loadImage(join(__dirname, `../../Assets/Images/chocolate-milk-${direction.toLowerCase()}.png`));

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

ImageRouter.get("/rip", async (req, res) => {
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
});

ImageRouter.get("/he-lives-in-you", async (req, res) => {
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

	const base = await loadImage(join(__dirname, "../../Assets/Images/he-lives-in-you.png"));

	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext("2d");

	ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

	ctx.rotate(-24 * (Math.PI / 180));

	drawImageWithTint(ctx, image, "#00115d", 75, 160, 130, 150);

	ctx.rotate(24 * (Math.PI / 180));

	res
		.status(200)
		.set({ "Content-Type": "image/png" })
		.send(canvas.toBuffer());
});

ImageRouter.get("/kyon-gun", async (req, res) => {
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
});

ImageRouter.get("/sip", async (req, res) => {
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

	const base = await loadImage(join(__dirname, `../../Assets/Images/sip-${direction.toLowerCase()}.png`));

	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext("2d");

	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.drawImage(image, 0, 0, 512, 512);

	ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

	res
		.status(200)
		.set({ "Content-Type": "image/png" })
		.send(canvas.toBuffer());
});

ImageRouter.get("/i-have-the-power", async (req, res) => {
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
});

ImageRouter.get("/hearts", async (req, res) => {
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

	const base = await loadImage(join(__dirname, "../../Assets/Images/hearts.png"));

	const canvas = createCanvas(image.width, image.height);
	const ctx = canvas.getContext("2d");

	drawImageWithTint(ctx, image, "deeppink", 0, 0, canvas.width, canvas.height);

	ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

	res
		.status(400)
		.set({ "Content-Type": "image/png" })
		.send(canvas.toBuffer());
});

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