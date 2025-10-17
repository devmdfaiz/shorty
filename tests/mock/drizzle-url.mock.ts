import { vi } from "vitest";
import type { DatabaseUrlRepo } from "@/application/repo/database-url.uc.repo.js";

export const shortIdsMock = ["abc12345678", "abc12345679", "abc12345680"];

export const originalUrlMock = "https://original.me/faizan-bhai";

class DrizzleUrlRepoMock implements DatabaseUrlRepo {
	create = vi.fn(() => Promise.resolve());
	delete = vi.fn(() => Promise.resolve());
	get = vi.fn(() => Promise.resolve(shortIdsMock));
	getByShortCode = vi.fn(() => Promise.resolve(originalUrlMock));
}

export default DrizzleUrlRepoMock;
