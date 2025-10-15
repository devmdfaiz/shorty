import type { Request, Response } from "express";
import z from "zod";
import { UrlUseCase } from "@/application/use-case/url/url.uc.js";
import { DrizzleUrlRepo } from "@/infrastructure/drizzle/repo/drizzle-url.infra.js";
import { BadRequestError } from "@/shared/errors/base.error.js";

export const deleteUrlController = async (req: Request, res: Response) => {
	const query = req.query;

	if (!query || !query.url) {
		throw new BadRequestError();
	}

	const { success, data: url, error } = z.url().safeParse(query.url);

	if (!success) {
		throw res.status(400).send(error.message);
	}

	// Handle authentication and logic here

	const db = new DrizzleUrlRepo();
	const urlUseCase = new UrlUseCase(db);
	await urlUseCase.delete(url);

	res.status(200).send("OK");
};
