import { IdFactory } from "@/domain/entity/id-factory.domain.entity.js";
import env from "@/shared/config/env.js";
import { BadRequestError } from "@/shared/errors/base.error.js";
import type { DatabaseUrlRepo } from "../../repo/database-url.uc.repo.js";
import type { UrlUseCaseRepo } from "../../repo/url.uc.repo.js";

export class UrlUseCase implements UrlUseCaseRepo {
	constructor(private databaseUrlRepo: DatabaseUrlRepo) {}

	async create(originalUrl: string): Promise<string> {
		const shortUrlId = IdFactory.randomUrlString();
		const host = env.URL_HOST;

		await this.databaseUrlRepo.create(originalUrl, shortUrlId);

		const shortedUrl = `https://${host}/${shortUrlId}`;

		return shortedUrl;
	}

	async get(): Promise<string[]> {
		const shortedIds = await this.databaseUrlRepo.get();

		return shortedIds.map((id) => `https://${env.URL_HOST}/${id}`);
	}

	async getOriginalUrl(shortCode: string): Promise<string> {
		const originalUrl = await this.databaseUrlRepo.getByShortCode(shortCode);

		return originalUrl;
	}

	async delete(shortedUrl: string): Promise<void> {
		const shortedId = shortedUrl.split("/").filter(Boolean).at(-1);

		if (!shortedId) {
			console.error("Invalid shorted url: ", shortedUrl);
			throw new BadRequestError();
		}

		const test = /^[A-Za-z0-9_-]+$/.test(shortedId);

		if (!test) {
			console.error("Invalid shorted url: ", shortedUrl);
			throw new BadRequestError();
		}

		await this.databaseUrlRepo.delete(shortedId);
	}
}
