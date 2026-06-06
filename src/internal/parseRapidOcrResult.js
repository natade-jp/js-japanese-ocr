import { JapaneseOcrError } from "../errors/JapaneseOcrError.js";

/**
 * RapidOCR-json の出力を解析して共通形式へ変換する
 * @param {string} stdout 標準出力
 * @param {string} stderr 標準エラー
 * @param {string} imagePath 入力画像の絶対パス
 * @returns {import('../types.js').OcrResult}
 */
export function parseRapidOcrResult(stdout, stderr, imagePath) {
	// stdout に起動ログなどが混在する可能性があるため、最初の JSON オブジェクトを抽出する
	const firstBrace = stdout.indexOf("{");
	const lastBrace = stdout.lastIndexOf("}");
	if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
		throw new JapaneseOcrError("RapidOCR-json の出力に JSON が見つかりません", { stdout, stderr, imagePath });
	}
	const jsonText = stdout.slice(firstBrace, lastBrace + 1);
	let obj;
	try {
		obj = JSON.parse(jsonText);
	} catch (e) {
		throw new JapaneseOcrError("RapidOCR-json の出力が JSON として解析できません", { stdout, stderr, imagePath, cause: e });
	}

	// 成功コードの判定 (例: code === 100)
	const code = obj.code;
	if (code === 100) {
		const data = obj.data ?? [];
		const lines = [];
		for (const item of data) {
			const box = item.box;
			const score = item.score;
			const text = item.text;
			if (!Array.isArray(box) || box.length !== 4) {
				throw new JapaneseOcrError("RapidOCR-json の box が不正です", { stdout, stderr, imagePath });
			}
			if (typeof score !== "number") {
				throw new JapaneseOcrError("RapidOCR-json の score が数値ではありません", { stdout, stderr, imagePath });
			}
			if (typeof text !== "string") {
				throw new JapaneseOcrError("RapidOCR-json の text が文字列ではありません", { stdout, stderr, imagePath });
			}
			const points = box.map(([x, y]) => ({ x, y }));
			lines.push({ text, confidence: score, points });
		}
		const fullText = lines.map((l) => l.text).join("\n");
		return { text: fullText, lines };
	}

	// 文字がないことを示すコード: 例として 101 を空結果とみなす（RapidOCR-json により異なる）
	if (code === 101 || code === 102) {
		return { text: "", lines: [] };
	}

	throw new JapaneseOcrError("RapidOCR-json がエラーを返しました", { code, stdout, stderr, imagePath });
}
