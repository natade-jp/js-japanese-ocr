// import semver from "semver";
import { JapaneseOcrError } from "../errors/JapaneseOcrError.js";

/**
 * 実行環境を検証する
 * @param {{platform?:string, arch?:string, nodeVersion?:string}} [overrides]
 */
export function validateEnvironment(overrides = {}) {
	const platform = overrides.platform ?? process.platform;
	const arch = overrides.arch ?? process.arch;
	const nodeVersion = overrides.nodeVersion ?? process.version.replace(/^v/, "");

	if (platform !== "win32") {
		throw new JapaneseOcrError("Windows 環境（win32）でのみ動作します", { imagePath: undefined });
	}
	if (arch !== "x64") {
		throw new JapaneseOcrError("CPU アーキテクチャ x64 のみサポートしています", { imagePath: undefined });
	}
	if (compareVersion(nodeVersion, "20.0.0") < 0) {
		throw new JapaneseOcrError("Node.js 20 以上が必要です", { imagePath: undefined });
	}
}

/**
 * バージョン文字列比較（簡易）
 * @param {string} a
 * @param {string} b
 * @returns {number} a>b => 1, a==b => 0, a<b => -1
 */
function compareVersion(a, b) {
	const pa = a.split(".").map((n) => parseInt(n, 10) || 0);
	const pb = b.split(".").map((n) => parseInt(n, 10) || 0);
	for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
		const na = pa[i] ?? 0;
		const nb = pb[i] ?? 0;
		if (na > nb) return 1;
		if (na < nb) return -1;
	}
	return 0;
}
