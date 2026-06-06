import fs from "node:fs/promises";
import path from "node:path";
import { JapaneseOcrError } from "../errors/JapaneseOcrError.js";

/**
 * 必要なファイルが存在するか検証する
 * @param {string[]} files ファイルパスの配列（絶対パス）
 */
export async function validateRequiredFiles(files) {
	const missing = [];
	for (const f of files) {
		try {
			const stat = await fs.stat(f);
			if (!stat.isFile()) missing.push(f);
		} catch (e) {
			missing.push(f);
		}
	}
	if (missing.length > 0) {
		throw new JapaneseOcrError("必要なファイルが存在しません", { stdout: "", stderr: "", code: undefined, imagePath: undefined, cause: new Error(missing.join(", ")) });
	}
}
