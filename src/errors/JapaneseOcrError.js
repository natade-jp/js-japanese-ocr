/**
 * 日本語OCR処理で発生したエラー
 */
export class JapaneseOcrError extends Error {
	/**
	 * @param {string} message
	 * @param {object} [opts]
	 */
	constructor(message, opts = {}) {
		const { code, stdout, stderr, imagePath, cause } = opts;
		super(message, { cause });
		this.name = "JapaneseOcrError";
		this.code = code;
		this.stdout = stdout;
		this.stderr = stderr;
		this.imagePath = imagePath;
	}
}
