import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * バイナリ・モデルのパスを解決
 * @returns {{binaryDirectory:string, executablePath:string, modelsDirectory:string, modelFiles:Record<string,string>}}
 */
export function resolveBinaryPaths() {
	const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
	const packageRoot = path.resolve(currentDirectory, "../..");

	const binaryDirectory = path.join(packageRoot, "bin", "win32-x64");

	const executablePath = path.join(binaryDirectory, "RapidOCR-json.exe");

	const modelsDirectory = path.join(binaryDirectory, "models");

	const modelFiles = {
		det: path.join(modelsDirectory, "ch_PP-OCRv3_det_infer.onnx"),
		cls: path.join(modelsDirectory, "ch_ppocr_mobile_v2.0_cls_infer.onnx"),
		rec: path.join(modelsDirectory, "rec_japan_PP-OCRv3_infer.onnx"),
		keys: path.join(modelsDirectory, "dict_japan.txt"),
	};

	return { binaryDirectory, executablePath, modelsDirectory, modelFiles };
}
