import { describe, expect, it } from "vitest";
import { IdFactory } from "@/domain/entity/id-factory.domain.entity.js";

describe("IdFactory", () => {
	it.concurrent(
		"should generate valid 16 character hex string and valid hex string",
		() => {
			const shortId = IdFactory.randomHex(16);

			expect(shortId).toHaveLength(16);
			expect(shortId).toMatch(/^[a-f0-9]+$/); // Regex for valid hex
		},
	);

	it.concurrent(
		"should generate valid 16 character url string and valid url string",
		() => {
			const shortId = IdFactory.randomUrlString(16);

			expect(shortId).toHaveLength(16);
			expect(shortId).toMatch(/^[A-Za-z0-9_-]+$/); // Regex for valid url string
		},
	);
});
