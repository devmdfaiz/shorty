import crypto from "node:crypto";

export const IdFactory = {
	randomHex(len = 16) {
		const byte = Math.ceil(len / 2);

		return crypto.randomBytes(byte).toString("hex").slice(0, len);
	},
	randomUrlString(len = 8) {
		const bytes = Math.ceil((len * 6) / 8);

		return crypto.randomBytes(bytes).toString("base64url").slice(0, len);
	},
};
