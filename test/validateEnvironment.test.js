import assert from "node:assert/strict";
import { validateEnvironment } from "../src/internal/validateEnvironment.js";

describe("validateEnvironment", () => {
	it("accepts valid overrides", () => {
		validateEnvironment({ platform: "win32", arch: "x64", nodeVersion: "20.0.0" });
	});

	it("rejects non-win32", () => {
		assert.throws(() => validateEnvironment({ platform: "linux", arch: "x64", nodeVersion: "20.0.0" }));
	});

	it("rejects old node", () => {
		assert.throws(() => validateEnvironment({ platform: "win32", arch: "x64", nodeVersion: "18.0.0" }));
	});
});
