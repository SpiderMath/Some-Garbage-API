import { CanvasRenderingContext2D } from "canvas";

export default function desaturate(ctx: CanvasRenderingContext2D, level: number, x: number, y: number, width: number, height: number) {
	const data = ctx.getImageData(x, y, width, height);

	for(let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			const dest = ((i * width) + j) * 4;
			// @ts-ignore
			const grey = Number.parseInt((0.2125 * data.data[dest]) + (0.7154 * data.data[dest + 1]) + (0.0721 * data.data[dest + 2]), 10);
			data.data[dest] += level * (grey - data.data[dest]);
			data.data[dest + 1] += level * (grey - data.data[dest + 1]);
			data.data[dest + 2] += level * (grey - data.data[dest + 2]);
		}
	}

	ctx.putImageData(data, x, y);
};