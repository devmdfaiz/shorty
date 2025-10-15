import type { Request, Response } from "express";
import { UrlUseCase } from "@/application/use-case/url/url.uc.js";
import { DrizzleUrlRepo } from "@/infrastructure/drizzle/repo/drizzle-url.infra.js";

export const getUrlController = async (_req: Request, res: Response) => {
	const db = new DrizzleUrlRepo();
	const urlUseCase = new UrlUseCase(db);
	const urls = await urlUseCase.get();

	res.status(200).send(urls);
};
