import type { Request, Response } from "express";
import z from "zod";
import { UrlUseCase } from "@/application/use-case/url/url.uc.js";
import { DrizzleUrlRepo } from "@/infrastructure/drizzle/repo/drizzle-url.infra.js";
import { BadRequestError } from "@/shared/errors/base.error.js";

export const createUrlController = async (req: Request, res: Response) => {
	const body = req.body;

	if (!body || !body.url) {
		throw new BadRequestError();
	}

	const { success, data: url, error } = z.url().safeParse(body.url);

	if (!success) {
		throw new BadRequestError(error.message);
	}

	// Handle authentication and logic here

	const db = new DrizzleUrlRepo();
	const urlUseCase = new UrlUseCase(db);
	const shortedUrl = await urlUseCase.create(url);

	res.status(201).send(shortedUrl);
};
