import { CanvasRenderingContext2D } from "canvas";

export default function greyscale(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
	const data = ctx.getImageData(x, y, width, height);

	for(let i = 0; i < data.data.length; i += 4) {
		const brightness = (0.34 * data.data[i]) + (0.5 * data.data[i + 1]) + (0.16 * data.data[i + 2]);
		data.data[i] = brightness;
		data.data[i + 1] = brightness;
		data.data[i + 2] = brightness;
	}

	ctx.putImageData(data, x, y);

	return ctx;
}