# @natade-jp/japanese-ocr

## 概要

Windows x64 向けの完全オフライン日本語OCRラッパー。内部で RapidOCR-json を利用し、Node.js から簡単に日本語OCRを実行できるようにします。

## 特徴

- Windows x64 専用
- Node.js 20 以上（ES Modules）
- 完全オフラインで動作
- RapidOCR-json の生データをラップし、統一された戻り値を提供

## 対応環境

- OS: Windows（win32）
- CPU: x64
- Node.js: >=20

## 基本的な使い方

例:

```javascript
import { recognize } from "@natade-jp/japanese-ocr";

const result = await recognize("./sample.png");
console.log(result.text);
console.log(result.lines);
```

## 戻り値

戻り値は次の形式です。

- `text`: 全認識文字列（行は改行で結合）
- `lines`: 行ごとの配列（`text`, `confidence`, `points`）

## エラー処理

OCR処理中のエラーは `JapaneseOcrError` が投げられます。例:

```javascript
try {
	await recognize("./not-found.png");
} catch (err) {
	if (err instanceof JapaneseOcrError) {
		console.error(err.message);
	}
}
```

## 対応している入力

現時点では画像ファイルパスのみ対応しています。

## 対応していない環境・機能

- Linux / macOS はサポート外
- Node.js < 20 はサポート外
- マルチ言語の正式サポートは行いません

## 使用しているモデル

検出モデル、方向分類モデル、認識モデル、辞書ファイルを内部で指定して実行します（日本語向けモデル）。

## RapidOCR-json について

内部で RapidOCR-json を実行して OCR を行います。本パッケージは RapidOCR-json の公式パッケージではありません。

実行時には `bin/win32-x64` をカレントディレクトリに指定して RapidOCR-json を起動します（RapidOCR-json がカレントディレクトリ基準で DLL やモデルを読み込む実装のため）。この選択理由は安定性のためであり、将来的に改善できる可能性があります。

## 同梱している第三者ソフトウェア

licenses フォルダに各種ライセンスファイルを同梱しています。

## ライセンス

MIT

## 開発方法

ユニットテストは `node --test` で実行できます。実機での統合テストは `test:integration` を参照してください。
