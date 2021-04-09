import { Image } from "canvas";
export default function centerImagePart(data: Image, maxWidth: number, maxHeight: number, widthOffset: number, heightOffset: number) {
	let { width, height } = data;
	if (width > maxWidth) {
		const ratio = maxWidth / width;
		width = maxWidth;
		height *= ratio;
	}
	if (height > maxHeight) {
		const ratio = maxHeight / height;
		height = maxHeight;
		width *= ratio;
	}
	const x = widthOffset + ((maxWidth / 2) - (width / 2));
	const y = heightOffset + ((maxHeight / 2) - (height / 2));
	return { x, y, width, height };
}