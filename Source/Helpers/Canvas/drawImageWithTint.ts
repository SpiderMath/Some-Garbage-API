import { CanvasRenderingContext2D, Image } from "canvas";

export default function drawImageWithTint(ctx: CanvasRenderingContext2D, image: Image, colour: string, x: number, y: number, width: number, height: number) {
	// Keeping a copy of previous configuration
	const { fillStyle, globalAlpha } = ctx;

	ctx.fillStyle = colour;

	ctx.drawImage(image, x, y, width, height);

	ctx.globalAlpha = 0.5;

	ctx.fillRect(x, y, width, height);

	// Returning the previous config as it was
	ctx.fillStyle = fillStyle;
	ctx.globalAlpha = globalAlpha;
};