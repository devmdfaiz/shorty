import { eq } from "drizzle-orm";
import type { DatabaseUrlRepo } from "@/application/repo/database-url.uc.repo.js";
import { IdFactory } from "@/domain/entity/id-factory.domain.entity.js";
import { DatabaseQueryError } from "@/shared/errors/base.error.js";
import db from "../db.drizzle.js";
import { urls } from "../schema.drizzle.js";

export class DrizzleUrlRepo implements DatabaseUrlRepo {
	async create(originalUrl: string, shortCode: string): Promise<void> {
		try {
			await db.insert(urls).values({
				id: IdFactory.randomHex(),
				orgUrl: originalUrl,
				shortCode: shortCode,
			});
		} catch (error) {
			console.error("[Database Query Error] Error creating url: ", error);

			throw new DatabaseQueryError();
		}
	}
	async delete(shortCode: string): Promise<void> {
		try {
			await db.delete(urls).where(eq(urls.shortCode, shortCode));
		} catch (error) {
			console.error("[Database Query Error] Error deleting url: ", error);

			throw new DatabaseQueryError();
		}
	}
	async get(): Promise<string[]> {
		try {
			const query = await db
				.select({
					shortCode: urls.shortCode,
				})
				.from(urls);

			return query.map(({ shortCode }) => shortCode);
		} catch (error) {
			console.error("[Database Query Error] Error getting urls: ", error);

			throw new DatabaseQueryError();
		}
	}

	async getByShortCode(shortCode: string): Promise<string> {
		try {
			const query = await db
				.select({
					orgUrl: urls.orgUrl,
				})
				.from(urls)
				.where(eq(urls.shortCode, shortCode));

			return query[0].orgUrl;
		} catch (error) {
			console.error(
				"[Database Query Error] Error getting shortcode for url: ",
				error,
			);

			throw new DatabaseQueryError();
		}
	}
}
