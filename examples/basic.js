import { recognize } from "../src/index.js";

async function main() {
	const image = process.argv[2] || "sample.png";
	try {
		const res = await recognize(image);
		console.log("TEXT:\n", res.text);
		console.log("LINES:\n", res.lines);
	} catch (e) {
		console.error(e);
		process.exitCode = 1;
	}
}

main();
