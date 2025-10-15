import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/shared/errors/base.error.js";

const globalErrorHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	if (err instanceof AppError) {
		res.status(err.statusCode).send(err.message);
		return;
	}

	res.status(500).send("Internal server error");
};

export default globalErrorHandler;
