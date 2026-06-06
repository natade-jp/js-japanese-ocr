import assert from "node:assert/strict";
import { parseRapidOcrResult } from "../src/internal/parseRapidOcrResult.js";

describe("parseRapidOcrResult", () => {
	it("parses normal output", () => {
		const stdout = JSON.stringify({
			code: 100,
			data: [
				{
					box: [
						[10, 10],
						[120, 10],
						[120, 35],
						[10, 35],
					],
					score: 0.987,
					text: "名鉄名古屋",
				},
			],
		});
		const res = parseRapidOcrResult(stdout, "", "C:\\img.png");
		assert.equal(res.text, "名鉄名古屋");
		assert.equal(res.lines.length, 1);
	});

	it("ignores startup logs and parses json", () => {
		const stdout = "Starting...\n" + JSON.stringify({ code: 100, data: [] }) + "\nReady";
		const res = parseRapidOcrResult(stdout, "", "C:\\img.png");
		assert.equal(res.text, "");
		assert.deepEqual(res.lines, []);
	});

	it("throws on invalid json", () => {
		const stdout = "garbage";
		assert.throws(() => parseRapidOcrResult(stdout, "", "C:\\img.png"));
	});
});
