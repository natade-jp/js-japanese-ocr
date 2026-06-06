import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolveBinaryPaths } from "./internal/resolveBinaryPaths.js";
import { validateEnvironment } from "./internal/validateEnvironment.js";
import { validateRequiredFiles } from "./internal/validateRequiredFiles.js";
import { executeRapidOcr } from "./internal/executeRapidOcr.js";
import { parseRapidOcrResult } from "./internal/parseRapidOcrResult.js";
import { JapaneseOcrError } from "./errors/JapaneseOcrError.js";

/**
 * 画像ファイルから日本語を認識する
 * @param {string} imagePath 画像ファイルのパス
 * @returns {Promise<import('./types.js').OcrResult>} OCR結果
 */
export async function recognize(imagePath) {
	if (typeof imagePath !== "string") {
		throw new TypeError("imagePath must be a string");
	}
	if (imagePath.trim() === "") {
		throw new TypeError("imagePath must not be empty");
	}

	// 環境チェック
	validateEnvironment();

	const absoluteImagePath = path.resolve(imagePath);

	// 入力ファイルチェック
	try {
		const st = await fs.stat(absoluteImagePath);
		if (!st.isFile()) throw new Error("not a file");
	} catch (e) {
		throw new JapaneseOcrError("入力画像ファイルが存在しないかファイルではありません", { imagePath: absoluteImagePath, cause: e });
	}

	const { binaryDirectory, executablePath, modelFiles } = resolveBinaryPaths();

	// 必要ファイルの存在確認
	const required = [executablePath, modelFiles.det, modelFiles.cls, modelFiles.rec, modelFiles.keys];
	try {
		await validateRequiredFiles(required);
	} catch (e) {
		throw new JapaneseOcrError("必要なバイナリ/モデルが見つかりません", { imagePath: absoluteImagePath, stdout: "", stderr: "", cause: e });
	}

	// コマンド引数を組み立てる（cwd を binaryDirectory に指定するため、モデルはファイル名で渡す）
	const args = ["--models=models", "--det=ch_PP-OCRv3_det_infer.onnx", "--cls=ch_ppocr_mobile_v2.0_cls_infer.onnx", "--rec=rec_japan_PP-OCRv3_infer.onnx", "--keys=dict_japan.txt", `--image=${absoluteImagePath}`];

	let result;
	try {
		result = await executeRapidOcr(executablePath, binaryDirectory, args);
	} catch (e) {
		throw new JapaneseOcrError("RapidOCR-json の実行に失敗しました", { imagePath: absoluteImagePath, cause: e });
	}

	try {
		return parseRapidOcrResult(result.stdout, result.stderr, absoluteImagePath);
	} catch (e) {
		if (e instanceof JapaneseOcrError) throw e;
		throw new JapaneseOcrError("RapidOCR-json の出力解析に失敗しました", { imagePath: absoluteImagePath, stdout: result.stdout, stderr: result.stderr, cause: e });
	}
}
