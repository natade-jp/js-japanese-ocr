import { recognize as _recognize } from "./recognize.js";
import { JapaneseOcrError } from "./errors/JapaneseOcrError.js";

export { JapaneseOcrError };

/**
 * 画像ファイルから日本語を認識する
 * @param {string} imagePath 画像ファイルのパス
 * @returns {Promise<import('./types.js').OcrResult>} OCR結果
 */
export async function recognize(imagePath) {
	return _recognize(imagePath);
}

export default { recognize };
