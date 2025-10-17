import DrizzleUrlRepoMock, {
	originalUrlMock,
	shortIdsMock,
} from "@tests/mock/drizzle-url.mock.js";
import { afterEach, describe, expect, it, vi } from "vitest";
import { UrlUseCase } from "@/application/use-case/url/url.uc.js";
import { IdFactory } from "@/domain/entity/id-factory.domain.entity.js";
import env from "@/shared/config/env.js";
import {
	BadRequestError,
	DatabaseQueryError,
} from "@/shared/errors/base.error.js";

describe("UrlUseCase", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	const shortCode = "abc12345678";

	it("should create correct url", async () => {
		const randomUrlStringSpyOn = vi
			.spyOn(IdFactory, "randomUrlString")
			.mockReturnValue(shortCode);

		const db = new DrizzleUrlRepoMock();
		const urlUseCase = new UrlUseCase(db);
		const url = await urlUseCase.create(originalUrlMock);

		expect(randomUrlStringSpyOn).toHaveBeenCalled();
		expect(db.create).toHaveBeenCalledWith(originalUrlMock, shortCode);
		expect(db.create).toHaveBeenCalledTimes(1);
		expect(url).toBe(`https://${env.URL_HOST}/abc12345678`);
	});

	it("should throw error for create correct url", async () => {
		const randomUrlStringSpyOn = vi
			.spyOn(IdFactory, "randomUrlString")
			.mockReturnValue(shortCode);

		const db = new DrizzleUrlRepoMock();
		db.create.mockRejectedValueOnce(new DatabaseQueryError());
		const urlUseCase = new UrlUseCase(db);

		expect(urlUseCase.create(originalUrlMock)).rejects.toBeInstanceOf(
			DatabaseQueryError,
		);
		expect(randomUrlStringSpyOn).toHaveBeenCalled();
		expect(db.create).toHaveBeenCalledWith(originalUrlMock, shortCode);
		expect(db.create).toHaveBeenCalledTimes(1);
	});

	it("should it delete for correct short url", async () => {
		const db = new DrizzleUrlRepoMock();
		const urlUseCase = new UrlUseCase(db);
		await urlUseCase.delete(`https://${env.URL_HOST}/abc12345678`);

		expect(db.delete).toHaveBeenCalled();
		expect(db.delete).toHaveBeenCalledWith(shortCode);
		expect(db.delete).toHaveBeenCalledTimes(1);
	});

	it("should it throw error for wrong short url for delete", async () => {
		const invalidUrl = `https://${env.URL_HOST}`;

		const db = new DrizzleUrlRepoMock();
		const urlUseCase = new UrlUseCase(db);

		expect(db.delete).not.toHaveBeenCalled();
		expect(db.delete).not.toHaveBeenCalledWith(shortCode);
		expect(urlUseCase.delete(invalidUrl)).rejects.toBeInstanceOf(
			BadRequestError,
		);
	});

	it("should it throw error for wrong short url", async () => {
		const invalidUrl = `https://${env.URL_HOST}`;

		const db = new DrizzleUrlRepoMock();
		const urlUseCase = new UrlUseCase(db);

		expect(db.delete).not.toHaveBeenCalled();
		expect(db.delete).not.toHaveBeenCalledWith(shortCode);
		expect(urlUseCase.delete(invalidUrl)).rejects.toBeInstanceOf(
			BadRequestError,
		);
	});

	it("should get list of urls", async () => {
		const db = new DrizzleUrlRepoMock();
		const expectedList = shortIdsMock.map(
			(id) => `https://${env.URL_HOST}/${id}`,
		);

		const urlUseCase = new UrlUseCase(db);
		const urls = await urlUseCase.get();

		expect(urls).toEqual(expectedList);
		expect(db.get).toHaveBeenCalled();
		expect(db.get).toHaveBeenCalledTimes(1);
	});

	it("should get original url", async () => {
		const db = new DrizzleUrlRepoMock();

		const useCase = new UrlUseCase(db);
		const originalUrl = await useCase.getOriginalUrl("test");

		expect(originalUrl).toEqual(originalUrlMock);
		expect(db.getByShortCode).toHaveBeenCalled();
		expect(db.getByShortCode).toHaveBeenCalledTimes(1);
	});
});
