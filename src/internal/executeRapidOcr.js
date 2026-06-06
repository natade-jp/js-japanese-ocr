import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * RapidOCR-json を実行して結果を返す
 * @param {string} executablePath 実行ファイルの絶対パス
 * @param {string} binaryDirectory RapidOCR-json の cwd とするディレクトリ
 * @param {string[]} args 引数配列
 * @returns {Promise<{stdout:string, stderr:string, exitCode:number|null}>}
 */
export function executeRapidOcr(executablePath, binaryDirectory, args) {
	return new Promise((resolve, reject) => {
		const child = spawn(executablePath, args, {
			cwd: binaryDirectory,
			windowsHide: true,
		});

		let stdout = "";
		let stderr = "";

		if (child.stdout) {
			child.stdout.setEncoding("utf8");
			child.stdout.on("data", (chunk) => {
				stdout += chunk;
			});
		}
		if (child.stderr) {
			child.stderr.setEncoding("utf8");
			child.stderr.on("data", (chunk) => {
				stderr += chunk;
			});
		}

		child.on("error", (err) => reject(err));
		child.on("close", (code) => resolve({ stdout, stderr, exitCode: code }));
	});
}
