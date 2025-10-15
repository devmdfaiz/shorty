import type { Request, Response } from "express";
import { UrlUseCase } from "@/application/use-case/url/url.uc.js";
import { DrizzleUrlRepo } from "@/infrastructure/drizzle/repo/drizzle-url.infra.js";
import { BadRequestError } from "@/shared/errors/base.error.js";

const redirectController = async (req: Request, res: Response) => {
	const shortCode = req.params.shortCode || "";

	if (!shortCode) {
		throw new BadRequestError("Short code is required");
	}

	const db = new DrizzleUrlRepo();
	const urlUseCase = new UrlUseCase(db);
	const originalUrl = await urlUseCase.getOriginalUrl(shortCode);

	res.redirect(originalUrl);
};

export default redirectController;
