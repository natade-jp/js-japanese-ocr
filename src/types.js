/**
 * OCR座標
 * @typedef {object} OcrPoint
 * @property {number} x X座標
 * @property {number} y Y座標
 */

/**
 * OCRで認識された文字列のまとまり
 * @typedef {object} OcrLine
 * @property {string} text 認識文字列
 * @property {number} confidence 認識信頼度
 * @property {[OcrPoint, OcrPoint, OcrPoint, OcrPoint]} points 文字領域の四隅
 */

/**
 * OCR結果
 * @typedef {object} OcrResult
 * @property {string} text 全認識文字列
 * @property {OcrLine[]} lines 行ごとの認識結果
 */

export {};
